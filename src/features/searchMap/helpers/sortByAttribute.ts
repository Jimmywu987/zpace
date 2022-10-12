import { RoomType } from "@/types/Room";

export const sortByAttribute = (array: RoomType[], ...attrs: any) => {
  // generate an array of predicate-objects contains
  // property getter, and descending indicator
  let predicates = attrs.map((pred: any) => {
    let descending = pred.charAt(0) === "-" ? -1 : 1;
    pred = pred.replace(/^-/, "");
    return {
      getter: (o: any) => o[pred],
      descend: descending,
    };
  });
  // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
  return array
    .map((item: any) => {
      return {
        src: item,
        compareValues: predicates.map((predicate: any) =>
          predicate.getter(item)
        ),
      };
    })
    .sort((o1: any, o2: any) => {
      let i = -1,
        result = 0;
      while (++i < predicates.length) {
        if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
        if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
        // eslint-disable-next-line no-cond-assign
        if ((result *= predicates[i].descend)) break;
      }
      return result;
    })
    .map((item: any) => item.src);
};
