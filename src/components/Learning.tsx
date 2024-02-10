import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { translateWords } from "../utils/features";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("language") as LanType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words, loading, error } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr: WordType[]) => {
        console.log(arr);
        dispatch(getWordsSuccess(arr));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getWordsFail(err));
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Container maxWidth="sm" sx={{ padding: "1rem" }}>
        <Button
          onClick={
            count === 0
              ? () => navigate("/")
              : () => setCount((prev) => prev - 1)
          }
        >
          <ArrowBack />
        </Button>
        <Typography children="Learn With Ease And Joy" m={"2rem 0"} />
        <Stack direction={"row"} spacing={"1rem"}>
          <Typography variant="h4">
            {count + 1} - {words[count]?.word}
          </Typography>
          <Typography variant="h4" color={"green"}>
            : {words[count]?.meaning}
          </Typography>
          <Button sx={{ borderRadius: "50%" }}>
            <VolumeUp />
          </Button>
        </Stack>
        <Button
          sx={{ margin: "3rem 0" }}
          variant="contained"
          fullWidth
          onClick={count === words.length - 1 ? () => navigate(`/quiz`) : nextHandler}
        >
          {count === words.length -1 ? "Test" : "Next"}
        </Button>
      </Container>
    </>
  );
};

export default Learning;
