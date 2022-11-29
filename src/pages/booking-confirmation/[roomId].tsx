import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Loader } from "@/features/common/components/Loader";
import { timeSlotFun } from "@/features/room/helpers";
import { d2 } from "@/helpers/d2";
import { timeSlotSelector } from "@/redux/bookTimeSlot";
import { settingSelector } from "@/redux/setting";
import { getRoomInfoById } from "@/services/getRoom";
import { prisma } from "@/services/prisma";
import { User } from "@/types/User";
import Alert from "@mui/material/Alert";
import { TimeslotStatusEnum } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RoomDetailPageProps } from "@/features/room/types";
const BookingConfirmation = (props: RoomDetailPageProps) => {
  const { roomInfo } = props;

  const timeSlotArr = timeSlotFun();
  const dispatch = useDispatch();
  const router = useRouter();

  const { setting } = useSelector(settingSelector);
  const { timeSlot } = useSelector(timeSlotSelector);

  const [payment, setPayment] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [backendRes, setBackendRes] = useState(false);

  const [amount, setAmount] = useState(0);

  const [bookedTimeSlot, setBookedTimeSlot] = useState<any>([]);
  const [bookedSlotNum, setBookedSlotNum] = useState(0);

  const groupTimeSlot = () => {
    let sortedArr = timeSlot.map((e: any) => {
      return {
        date: e.date,
        index: timeSlotArr.indexOf(`${d2(e.hour)}:${d2(e.minute)}`),
      };
    });
    setBookedSlotNum(sortedArr.length);
    let group: any = sortedArr.reduce((r: any, a: any) => {
      r[a.date] = [...(r[a.date] || []), a];
      return r;
    }, {});

    let dateFormatArr: any = [];
    let value: any, key;

    for ([key, value] of Object.entries(group)) {
      let groupArr: any = [];
      value.sort((a: any, b: any) => {
        return a.index - b.index;
      });
      for (let i = 0; i < value.length; i++) {
        let result = value.findIndex(
          (e: any, i: any, a: any) => i !== 0 && e.index - 1 !== a[i - 1].index
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
  };
  useEffect(() => {
    groupTimeSlot();
  }, []);

  const TimeSlotsRenderDate = ({ info }: any) => {
    return <div>{info.date}</div>;
  };

  const TimeSlotsRenderTime = ({ info }: any) => {
    let timeAdjustmentIndx = timeSlotArr.indexOf(info.to);
    let timeAdjustment = timeSlotArr[timeAdjustmentIndx + 1];
    return (
      <div>
        {info.from} - {timeAdjustment}
      </div>
    );
  };

  const onClickPayment = () => {
    setPayment(true);
    setAmount((roomInfo.hourlyPrice * bookedSlotNum) / 2);
  };

  const Payment = () => {
    const paymentHandler = async (details: any, data: any) => {
      setBackendRes(true);
      //  Here you can call your backend API
      // endpoint and update the database
      if (details.status === "COMPLETED") {
        sendSuccessToBackend();
      }
    };
    return (
      <div>
        {backendRes && (
          <div>
            <Alert severity="success">{resMessage}</Alert>
            <Loader />
          </div>
        )}
        {!backendRes && (
          <Alert severity="info">
            Please don't leave the page until the transaction is completed
          </Alert>
        )}
        <br />
        <button>PAYPAL</button>
      </div>
    );
  };
  const sendSuccessToBackend = async () => {
    // let stringNum = (roomInfo.hourlyPrice * bookedSlotNum) / 2;
    // const responseJSON = await fetch(
    //   `${REACT_APP_API_SERVER}/view-room/to-success`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: bearer,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ppl: setting.ppl,
    //       price: stringNum,
    //       rooms_id: roomInfo.id,
    //       room_owner_id: roomInfo.user.id,
    //       space_name: roomInfo.spaceName,
    //       room_owner_email: roomInfo.user.email,
    //       bookedTimeSlot: bookedTimeSlot,
    //     }),
    //   }
    // );
    // if (responseJSON.status === 200) {
    //   let response = await responseJSON.json();
    //   setResMessage(`${response.message}`);
    //   setTimeout(() => {
    //     dispatch(
    //       push(
    //         `/room-owner/user-booking-history-detail/${response.customerEmail}`
    //       )
    //     );
    //     setBackendRes(false);
    //   }, 5000);
    // }
  };
  return (
    <div className="">
      {!payment && (
        <div>
          <h3 className="">Confirm Your Booking</h3>
          <hr />
          <div className="">
            <div className="">
              <img
                className=""
                alt="booking-pictures"
                src={roomInfo.roomImgs[0].url}
              />
              <br />
              <div className="">
                <div className="">
                  <h5 className="">{roomInfo.spaceName}</h5>
                  <div>Address: {roomInfo.address}</div>
                  <br />
                  <div>Host: {roomInfo.user.username}</div>
                  <div>
                    <span className="">Number of Visitor(s): </span>
                    <span className="">{setting.ppl}</span>
                  </div>
                </div>
                <div className="">
                  <h3 className="">Booking Timeslot</h3>
                  <div>
                    <div className="">
                      <div className="">
                        <div>
                          <div>
                            <div>
                              <span className="">Date(s)</span>
                            </div>
                            <div>
                              <span className="">Time</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {bookedTimeSlot.length > 0 &&
                            bookedTimeSlot.map((e: any, index: number) => (
                              <div key={index}>
                                <div>
                                  <div key={index}>
                                    <TimeSlotsRenderDate info={e} />
                                  </div>
                                </div>
                                <div>
                                  <div key={index}>
                                    <TimeSlotsRenderTime info={e} />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <br />
          <div className="">Hourly Price: ${roomInfo.hourlyPrice}</div>
          <div className="">
            Total Payment: {`$${(roomInfo.hourlyPrice * bookedSlotNum) / 2}`}
          </div>
          <div className="">
            <button onClick={() => router.back()} className="">
              Cancel
            </button>
            <button className="" onClick={onClickPayment}>
              Confirm Payment
            </button>
          </div>
        </div>
      )}
      {payment && (
        <div>
          <Payment />
        </div>
      )}
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
