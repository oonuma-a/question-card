import { Button } from "@react-navigation/elements";

export default function QuestionSettings () {
  return (
    <>
        <Button onPress={alert}>最初から出題</Button>
        <Button onPress={alert}>ランダム出題</Button>
    </>
  );
}