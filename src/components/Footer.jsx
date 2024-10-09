import { LinkedinIcon } from "../assets";

const Footer = () => {
  return (
    <div className="h-[60px] w-full px-[20px] flex justify-end items-center">
      <div
        className="flex flex-row gap-[5px] items-center hover:cursor-pointer  p-[5px] rounded-lg"
        onClick={() => {
          window.open("https://www.linkedin.com/in/atorrero/");
        }}
      >
        <img src={LinkedinIcon} alt="linkedinLogo" className="h-[28px]" />
        <p className="text-secondary">Diego Alejandro Torrero Gracia</p>
      </div>
    </div>
  );
};
export default Footer;
