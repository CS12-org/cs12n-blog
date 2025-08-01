import twMerge from "~/lib/tw-merge";
import {
  RadioGroup,
  Radio,
  type RadioGroupProps,
} from "~/components/react-aria-components";

interface ColorOption {
  label: string;
  bgColorClass: string;
  value: string;
}

interface ColorRadioGroupProps extends Omit<RadioGroupProps, "children"> {
  options: ColorOption[];
}

function MyRadioGroup({ options, ...props }: ColorRadioGroupProps) {
  return (
    <RadioGroup {...props} className="flex flex-wrap gap-2.5 ">
      {options.map((opt) => {
        return (
          <Radio
            key={opt.value}
            value={opt.value}
            className={twMerge(
              "group flex items-center bg-mantle rounded-md border-2",
              "border-transparent transition-all duration-200 cursor-pointer",
              opt.value === "lavender" && "selected:border-lavender",
              opt.value === "maroon" && "selected:border-maroon",
              opt.value === "teal" && "selected:border-teal",
              opt.value === "peach" && "selected:border-peach",
              opt.value === "sky" && "selected:border-sky",
              opt.value === "mauve" && "selected:border-mauve",
              opt.value === "pink" && "selected:border-pink",
              opt.value === "flamingo" && "selected:border-flamingo",
            )}
          >
            <div
              className={`h-3 w-3 m-2.5 rounded-bl rounded-tr ${opt.bgColorClass}`}
            />
            <span className="m-2.5 text-xs text-text">{opt.label}</span>
          </Radio>
        );
      })}
    </RadioGroup>
  );
}

// import Button from "~/components/Button"
// import twMerge from "~/lib/tw-merge";

// type ThemeSettingProps = {
//   buttonText: string;
//   bgColorClass: string;
// };

// function ThemeSetting({ buttonText, bgColorClass }: ThemeSettingProps) {
//   return (
//     <div className="flex bg-mantle  rounded-md">
//       <div className={twMerge("h-3 w-3 m-2.5 rounded-bl rounded-tr", bgColorClass)}> </div>
//     {/* <div className={`${bgColorClass} h-3 w-3 m-2.5 rounded-bl rounded-tr`}></div> */}
//       <Button variant="none" className="m-2.5 text-xs ">{buttonText} </Button>
//     </div>
//   );
// }

export default MyRadioGroup;
