import { memo, useEffect, useMemo, useState } from "react";

import { timeSlotFun } from "@/features/room/helpers";
import { RoomDetailPageProps, RoomInfoType } from "@/features/room/types";
import { d2 } from "@/helpers/d2";
import { timeSlotSelector } from "@/redux/bookTimeSlot";
import { settingSelector } from "@/redux/setting";
import { getRoomInfoById } from "@/services/getRoom";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  Elements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  CreateSourceData,
  loadStripe,
  SourceResult,
  TokenResult,
} from "@stripe/stripe-js";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { paymentCheckout } from "@/apis/api";
import {
  TimeSlotsRenderTime,
  TimeSlotsRenderDate,
  TimeSlotsRender,
} from "@/features/room/components/TimeSlotRender";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY ?? "");

const PaymentInfo = ({
  roomInfo,
  bookedSlotNum,
  bookedTimeSlot,
}: {
  roomInfo: RoomInfoType;
  bookedSlotNum: number;
  bookedTimeSlot: any;
}) => {
  const router = useRouter();
  const stripe = useStripe();

  const elements = useElements();
  const [inPayingProcess, setInPayingProcess] = useState(false);
  const { setting } = useSelector(settingSelector);
  console.log("bookedTimeSlot", bookedTimeSlot);
  const checkout = async () => {
    const stripeElement = elements?.getElement(CardNumberElement);

    if (inPayingProcess || !stripeElement) return;
    setInPayingProcess(true);

    const token = await stripe?.createToken(stripeElement);

    const res = await paymentCheckout({
      tokenId: token?.token?.id,
      price: (roomInfo.hourlyPrice * bookedSlotNum) / 2,
      roomId: roomInfo.id,
      headCount: setting.ppl,
      roomOwnerId: roomInfo.user.id,
      bookedTimeSlot,
      spaceName: roomInfo.spaceName,
    });
    if (res && res.status === 200) {
      toast.success("The room is booked!");
      router.push(
        `/room-owner/user-booking-history-detail/${res.data.customerBookingId}`
      );
    } else {
      toast.error("Something went wrong, please try again");
    }
    setInPayingProcess(false);
  };
  return (
    <div className="flex flex-col">
      <div className="p-4 space-y-4 bg-gray-100">
        <TextField
          name="cc-name"
          className="flex w-full bg-white"
          label={<span className="text-sm">Name on the card</span>}
          type="credit-card"
          variant="outlined"
          size="small"
        ></TextField>
        <CardNumberElement
          options={{
            placeholder: "Credit Card Number",
            classes: {
              base: "bg-white border  border-gray-300 px-4 py-3 rounded",
            },
            showIcon: true,
          }}
        />
        <div className="flex w-full space-x-2">
          <CardExpiryElement
            options={{
              placeholder: "Expiry date (MM / YY)",
              classes: {
                base: "bg-white border border-gray-300 px-4 py-3 rounded w-1/2",
              },
            }}
          />
          <CardCvcElement
            options={{
              placeholder: "Security code",
              classes: {
                base: "bg-white border border-gray-300 px-4 py-3 rounded w-1/2",
              },
            }}
          />
        </div>
      </div>
      <div className="self-end space-y-1 flex flex-col my-3">
        <div className="text-gray-700  self-end">
          Hourly Price: ${roomInfo.hourlyPrice}
        </div>
        <div className="text-gray-700  self-end">
          Total Payment:{" "}
          <span className="text-2xl text-theme-color2 font-bold">{`$${
            (roomInfo.hourlyPrice * bookedSlotNum) / 2
          }`}</span>
        </div>
        <div className="flex space-x-2 py-2">
          <button
            className="bg-theme-color1 text-white px-3 py-1 font-medium shadow text-lg"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="bg-theme-color2 text-white px-3 py-1 font-medium shadow text-lg"
            onClick={checkout}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};
const MemoPaymentInfo = memo(PaymentInfo);

const BookingConfirmation = (props: RoomDetailPageProps) => {
  const { roomInfo } = props;

  const timeSlotArr = timeSlotFun();
  const { setting } = useSelector(settingSelector);
  const { timeSlot } = useSelector(timeSlotSelector);

  const [bookedTimeSlot, setBookedTimeSlot] = useState([]);
  const [bookedSlotNum, setBookedSlotNum] = useState(0);

  useEffect(() => {
    (() => {
      const sortedArr = timeSlot.map((timeSlot) => {
        return {
          date: timeSlot.date,
          index: timeSlotArr.indexOf(
            `${d2(timeSlot.hour)}:${d2(timeSlot.minute)}`
          ),
        };
      });
      setBookedSlotNum(sortedArr.length);

      const group = sortedArr.reduce((r: any, a: any) => {
        r[a.date] = [...(r[a.date] || []), a];
        return r;
      }, {});

      const dateFormatArr: any = [];
      let value: any, key;

      for ([key, value] of Object.entries(group)) {
        let groupArr: any = [];
        value.sort((a: any, b: any) => {
          return a.index - b.index;
        });
        for (let i = 0; i < value.length; i++) {
          let result = value.findIndex(
            (e: any, i: any, a: any) =>
              i !== 0 && e.index - 1 !== a[i - 1].index
          );
          groupArr.push(value.splice(0, result));
        }
        groupArr = groupArr.concat([value]);
        for (let k = 0; k < groupArr.length; k++) {
          if (groupArr[k].length > 0) {
            dateFormatArr.push({
              date: groupArr[k][0].date,
              from: timeSlotArr[groupArr[k][0].index],
              to: timeSlotArr[groupArr[k][groupArr[k].length - 1].index],
            });
          }
        }
      }
      setBookedTimeSlot(dateFormatArr);
    })();
  }, []);

  return (
    <div className="flex flex-col px-2 md:px-0 space-y-2">
      <h3 className="border-b border-b-gray-300 text-2xl md:text-3xl py-2 my-2 text-gray-700">
        Confirm Your Booking
      </h3>
      <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
        <img
          className="object-contain w-full md:w-2/6 "
          alt="booking-pictures"
          src={roomInfo.roomImgs[0].url}
        />
        <div className="flex flex-col space-y-3 w-full">
          <div className="space-y-1">
            <h5 className="text-2xl text-gray-700">{roomInfo.spaceName}</h5>
            <div className="text-gray-700">
              <div className="">
                Address:{" "}
                <span className="font-medium text-theme-color1">
                  {roomInfo.address}
                </span>
              </div>
              <div className="">
                Host:{" "}
                <span className="font-medium text-theme-color1">
                  {roomInfo.user.username}
                </span>
              </div>
              <div>
                <span className="">Number of Visitor(s): </span>
                <span className="font-medium text-theme-color1">
                  {setting.ppl}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl text-gray-700">Booking Timeslot</h3>
            <TimeSlotsRender
              bookedTimeSlot={bookedTimeSlot}
              timeSlotArr={timeSlotArr}
            />
          </div>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <MemoPaymentInfo
          bookedSlotNum={bookedSlotNum}
          roomInfo={roomInfo}
          bookedTimeSlot={bookedTimeSlot}
        />
      </Elements>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { roomId } = context.query;

  if (!roomId || Array.isArray(roomId)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  const roomInfo = await getRoomInfoById(roomId);

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      roomInfo: JSON.parse(JSON.stringify(roomInfo)),
    },
  };
};
export default BookingConfirmation;
