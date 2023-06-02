import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Layout from "../../../components/Layout";
import RecordBet from "../../../components/games/keno/RecordBet";
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
      </Layout>
    </>
  );
};

export default Home;
