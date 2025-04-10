import useLargeDataHook from "../hooks/useLargeDataHook";

const LargeDataComponent = ({ router }) => {
  const { isDone } = useLargeDataHook();

  return (
    <div>
      {!isDone ? (
        <span>Calling server with large data</span>
      ) : (
        <span>Called server. See console.</span>
      )}
    </div>
  );
};

export default LargeDataComponent;
