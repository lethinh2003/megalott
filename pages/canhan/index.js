import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import LoadingBox from "../../components/homePage/LoadingBox";
import AccountInfo from "../../components/user/AccountInfo";
import AccountMenu from "../../components/user/AccountMenu";
const CaNhan = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/dangnhap");
    return null;
  }
  const callDataApi = async (account) => {
    if (!account) {
      return undefined;
    }
    const results = await axios.get(`${process.env.ENDPOINT_SERVER}/api/v1/nguoidung?taiKhoan=${account}`);
    return results.data;
  };
  const getListQuery = useQuery(
    ["get-detail-user", session ? session.user.taiKhoan : null],
    () => callDataApi(session ? session.user.taiKhoan : null),
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading, isFetching, isError: isErrorQuery, error } = getListQuery;

  return (
    <>
      <Layout>
        {isLoading && <LoadingBox isLoading={isLoading} />}
        {!isLoading && data && (
          <>
            <AccountInfo user={data?.data} />
            <AccountMenu />
          </>
        )}
      </Layout>
    </>
  );
};

export default CaNhan;
