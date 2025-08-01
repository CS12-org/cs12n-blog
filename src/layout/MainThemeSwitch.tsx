// TODO: change implementation of this button to work with next js

import { /*FaMoon,*/ FaSun } from "react-icons/fa6";
import Button from "~/components/Button";
// import { useRouteLoaderData, useSubmit } from "react-router";
// import type { loader } from "~/root";

function MainThemeSwitch() {
  // const loaderData = useRouteLoaderData<typeof loader>("root");
  // const theme = loaderData?.theme ?? "dark";
  // const submit = useSubmit();

  // const pressHandler = () => {
  //   const newTheme = theme === "dark" ? "light" : "dark";
  //
  //   submit(JSON.stringify({ theme: newTheme }), {
  //     method: "POST",
  //     navigate: false,
  //     action: "/api/theme",
  //     encType: "application/json",
  //   });
  // };

  return (
    <Button
      variant="none"
      isDisabled={false}
      className="p-3 bg-base rounded-full text-overlay-1"
    >
      <FaSun size={16} />
      {/* {theme === "dark" && <FaSun size={16} />} */}
      {/* {theme === "light" && <FaMoon size={16} />} */}
    </Button>
  );
}

export default MainThemeSwitch;
