import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Layout from "../../../components/Layout";
import BoxLichSu from "../../../components/games/keno/3p/BoxLichSu";
import RecordBet from "../../../components/games/keno/3p/RecordBet";
const Home = () => {
  const dispatch = useDispatch();
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
