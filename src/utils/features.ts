import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateMCQ = (
  meaning: {
    Text: string | string[];
  }[],
  idx: number
): string[] => {
  const correctAns: string = Array.isArray(meaning[idx].Text)
    ? meaning[idx].Text[0] 
    : meaning[idx].Text.toString(); 
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correctAns
  );
  const inCorrectOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => Array.isArray(i.Text) ? i.Text[0] : i.Text.toString());
  const mcQoptions = _.shuffle([...inCorrectOptions, correctAns]);
  return mcQoptions;
};


export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    const words = Array.from({ length: 8 }, () => ({
      Text: generate(),
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

    console.log(response.data);
    const receive: FetchedDataType[] = response.data;

    const arr: WordType[] = receive.map((i, idx) => {
      const options: string[] = generateMCQ(words, idx);
      const meaning: string = Array.isArray(words[idx].Text)
        ? words[idx].Text[0]
        : words[idx].Text.toString(); 
      return {
        word: i.translations[0].text,
        meaning: meaning,
        options,
      };
    });
    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};
