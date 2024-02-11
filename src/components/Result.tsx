import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );
  const correctAns = countMatchingElements(
    result,
    words.map((i) => i.meaning)
  );
  const percentage = (correctAns / words.length) * 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetHandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          color={"primary"}
          m={"2rem 0"}
          children="Result"
        />
        <Typography
          variant="h6"
          m={"1rem"}
          children={`You Got ${correctAns} out of ${words?.length} `}
        />
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Stack>
            <Typography m={"1rem 0"} variant="h5" children="Your Ans" />
            <List>
              {result.map((i, idx) => (
                <ListItem key={idx}>
                  {idx + 1} - {i}
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack>
            <Typography children="Correct Ans" variant="h5" m={"1rem 0"} />
            <List>
              {words?.map((i, idx) => (
                <ListItem key={idx}>
                  {idx + 1} - {i.meaning}
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
        <Typography
          m={"1rem"}
          variant="h5"
          color={percentage > 50 ? "green" : "red"}
        >
          {percentage > 50 ? "Pass" : "Fail"}
        </Typography>
        <Button
          sx={{ margin: "1rem" }}
          variant="contained"
          onClick={resetHandler}
        >
          Reset
        </Button>
      </Container>
    </>
  );
};

export default Result;
