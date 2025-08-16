import Arrow from "~/assets/images/sidebar-arrow.svg"

export default function PostSideBar(){
    return(
        <section className="flex flex-col ml-[20px] mt-[370px]">
           <section className="bg-crust p-[10px] rounded-[10px] cursor-pointer">
            <Arrow className="w-[27px] h-[27px] rounded-[3px] p-[5px] bg-base" />
        </section>
        </section>
    )
}
