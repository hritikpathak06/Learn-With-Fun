import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

function Home() {
  const navigate = useNavigate();

  const languageSelectHanlder = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          p={"2rem"}
          textAlign={"center"}
          fontWeight={900}
        >
          Welcome
        </Typography>
        <Stack
          flexDirection={"row"}
          spacing={"2rem"}
          p={"2rem"}
          alignItems={"center"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          m={"2rem"}
        >
          {languages.map((i) => (
            <Button
              onClick={() => languageSelectHanlder(i.code)}
              key={i.code}
              variant="contained"
            //   sx={{marginLeft:"5rem"}}
            >
              {i.name}
            </Button>
          ))}
        </Stack>
        <Typography
          children="Choose One Language From Above"
          textAlign={"center"}
        />
      </Container>
    </>
  );
}

export default Home;
