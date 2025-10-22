import type { LoaderFunctionArgs, MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export function loader({ context }: LoaderFunctionArgs) {
  return { message: "Hello World" };
}

export default function Home({ loaderData }: { loaderData: { message: string } }) {
  return <div>Hello World - {loaderData.message}</div>;
}
