import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import BoxLichSu from "../../../components/games/xucxac/5p/BoxLichSu";
import RecordBet from "../../../components/games/xucxac/5p/RecordBet";
const Home = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/dangnhap");
    return null;
  }

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
