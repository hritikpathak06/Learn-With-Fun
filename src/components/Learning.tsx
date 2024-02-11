import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import {  useDispatch, useSelector } from "react-redux";
import {
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const[audioSrc,setAudioSrc] = useState<string>("");
  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const { words, loading} = useSelector(
    (state: { root: StateType }) => state.root
  );


  const audioHandler = async() => {
    const player:HTMLAudioElement = audioRef.current! 
    if(player){
      player.play()
    }else{
      const data = await fetchAudio(words[count].word,params);
      setAudioSrc(data);
    }

  }

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("")
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr:WordType[]) => {
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
        {audioSrc &&
         <audio src={audioSrc} autoPlay ref={audioRef}></audio>
        }
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
          <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
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
