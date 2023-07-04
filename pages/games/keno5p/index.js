import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../../../components/Layout";
import BoxLichSu from "../../../components/games/keno/5p/BoxLichSu";
import RecordBet from "../../../components/games/keno/5p/RecordBet";
const Home = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <>
      <Layout>
        <RecordBet />
        <BoxLichSu />
      </Layout>
    </>
  );
};

export default Home;
