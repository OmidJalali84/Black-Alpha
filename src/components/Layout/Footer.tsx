import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-base-200 sm:px-4">
      <div className="container mx-auto pt-12 px-4 relative">
        <div className="-mx-4 flex flex-wrap gap-6 items-end mb-12">
          <div className="px-4 w-full lg:w-auto ml-auto">
            <div className="flex-wrap gap-2 inline-flex sm:gap-4">
              <Link
                to="https://discord.com/invite/8MKKBtvufZ"
                className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-success hover:to-primary-500 inline-block p-1 rounded-full text-white to-primary-400"
                aria-label="discord"
              >
                {/*<img className={"w-10 h-10"} src={discord} alt="discord"/>*/}
              </Link>{" "}
              <Link
                to="https://twitter.com/Boundlessworlld"
                className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-success hover:to-primary-500 inline-block p-1 rounded-full to-primary-400"
                aria-label="twitter"
              >
                {/*<img className={"w-10 h-10 rounded-full"} src={xLogo} alt="twitter"/>*/}
              </Link>{" "}
              <Link
                to="https://www.linkedin.com/company/boundlessworld/"
                className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-success hover:to-primary-500 inline-block p-1 rounded-full to-primary-400"
                aria-label="twitter"
              >
                {/*<img className={"w-10 h-10 rounded-full"} src={linkdin} alt="linkdien"/>*/}
              </Link>{" "}
              <Link
                to="https://t.me/boundlessworld_group"
                className="bg-gradient-to-t bg-primary-500 from-primary-500 hover:bg-success hover:to-primary-500 inline-block p-1 rounded-full text-white to-primary-400"
                aria-label="youtube"
              >
                {/* <img className={"w-10 h-10 rounded-full"} src={telegram} alt="telegram"/> */}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full p-4 xl:w-4/12">
            <Link
              to="/"
              className="font-bold gap-2 hover:text-gray-300 inline-flex items-center leading-none mb-6 text-3xl text-white uppercase"
            >
              <span>Rifex</span>
            </Link>
            <p className="font-light mb-4"></p>
          </div>
        </div>

        <div className="py-4">
          <hr className="mb-4 opacity-20" />
          <div className="flex flex-wrap -mx-4  items-center">
            <div className="px-4 py-2 w-full md:flex-1">
              <p>&copy; 2022 - 2023. All Rights Reserved - Rifex</p>
            </div>
            <div className="px-4 py-2 w-full sm:w-auto">
              <Link to="#" className="hover:text-primary-600 text-primary-500">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link to="#" className="hover:text-primary-600 text-primary-500">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
