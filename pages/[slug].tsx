import { Box, Button, Center, Container, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { TwitterShareButton } from "react-share";
import { Loading } from "../components/Loading";

type Props = {
  slug: string;
  score: number;
};

export const getServerSideProps: GetServerSideProps<{ slug: string }> = async (
  ctx
) => {
  const slug = ctx.params?.slug as string;

  const data = await fetch(
    `https://asia-northeast1-faro-connect.cloudfunctions.net/twitter_influ_score?id=${slug}`
  ).then((res) => res.json());
  return { props: { slug, score: data.score } };
};

const ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://faro-connect.uc.r.appspot.com" // あとでApp EngineのURLを書く
    : "http://localhost:3000";

const ShowPage: NextPage<Props> = ({ slug, score }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const currentURL = typeof location === "undefined" ? "" : location.href;

  const title = `@${slug}のスコア - twitter_influ_score`;

  return (
    <Container display="grid" placeItems="center" height="100vh">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${ORIGIN}/${slug}`} />
        <meta
          property="og:image"
          content={`${ORIGIN}/api/${slug}/ogp?score=${score}`}
        />
        <meta property="og:site_name" content="twitter_influ_score" />
        <meta
          property="og:description"
          content="ツイッターの影響度をスコア化"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Box border="gray" p="2">
            <Center>
              <Text fontSize="xl">スコア</Text>
            </Center>
            <Center>
              <Text fontSize="4xl" fontWeight="bold">
                {score}
              </Text>
            </Center>
          </Box>

          <Center>
            <TwitterShareButton
              title={`@${slug}のスコアは${score}です`}
              url={currentURL}
              resetButtonStyle
            >
              <Button
                bgColor="#00ACEE"
                color="white"
                _hover={{ bgColor: "" }}
                as="div"
              >
                <FaTwitter />
                <Text ml="2">Twitterで共有</Text>
              </Button>
            </TwitterShareButton>
          </Center>
        </Box>
      )}
    </Container>
  );
};

export default ShowPage;
