import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateMCQ = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correctAns
  );
  const inCorrectOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => i.Text);
  const mcQoptions = _.shuffle([...inCorrectOptions,correctAns])
  return mcQoptions
};


export const translateWords = async (params: LanType) => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "api-version": "3.0",
          "to[0]": params,
          textType: "plain",
          profanityAction: "NoAction",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "a7c5793e16mshbe6517a1c475f74p17fb64jsn4e8a08f42799",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    const received: FetchedDataType[] = response.data;
    const arr: WordType[] = received.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};
