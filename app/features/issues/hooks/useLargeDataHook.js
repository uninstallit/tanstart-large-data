import { useEffect, useMemo, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/start";
import { largeDataServerFn } from "../functions/largeDataServerFn";

const LOREM_IPSUM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
];

function generateLoremIpsumData(count = 100, textLength = 1000) {
  const result = [];

  for (let i = 0; i < count; i++) {
    let text = "";

    while (text.length < textLength) {
      const paragraph =
        LOREM_IPSUM_PARAGRAPHS[
          Math.floor(Math.random() * LOREM_IPSUM_PARAGRAPHS.length)
        ];
      text += paragraph + " ";
    }

    result.push({
      id: i + 1,
      text: text.substring(0, textLength),
    });
  }

  return result;
}

const useLargeDataHook = () => {
  const doneRef = useRef(false);

  const largeDataServerFnMutation = useMutation({
    mutationFn: (props) => {
      return largeDataServerFn(props);
    },
    // mutationFn: useServerFn((props) => {
    //   return largeDataServerFn(props);
    // }),
    // gcTime: Infinity,
    onError: (error) => console.error("Unable to pass data: ", error),
  });

  // count = 100 - Headers too large
  // count = 3000 - CORS error
  const data = useMemo(() => generateLoremIpsumData(100, 1000), []);

  useEffect(() => {
    const asyncFn = async () => {
      if (!doneRef.current && data.length > 0) {
        console.log(" --- created data and calling mutate ---- ");
        largeDataServerFnMutation.mutate({ data });
        doneRef.current = true;
      }
    };
    asyncFn();
  }, [data]);

  return useMemo(() => ({ isDone: doneRef.current }), []);
};

export default useLargeDataHook;
