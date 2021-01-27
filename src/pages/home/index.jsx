import { useEffect, useState } from "react";

import { Container, Box, CircularProgress } from "@material-ui/core";
import { AppBar, Title } from "../../components";
import { Books } from "./components";

const Loading = () => (
  <Container>
    <Box
      style={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
      height={"100vh"}
      width="100%"
    >
      <CircularProgress />
    </Box>
  </Container>
);

export default function Index(props) {
  const [status, setStatus] = useState(true);
  const { history } = props;
  useEffect(() => {
    setTimeout(() => setStatus(false), 2000);
  }, []);
  return (
    <>
      {status ? (
        <Loading />
      ) : (
        <>
          <AppBar navigate={history} goBack={false} />
          <Container>
            <Title text={"Libros"} />
            <Books navigate={history} />
          </Container>
        </>
      )}
    </>
  );
}
