import type { User, ProjectMember } from "../../../types/user";

export default function HeaderProject({
    contributornb,
    owner,
    members,
}: {
    contributornb: string;
    owner: User | undefined;
    members: ProjectMember[] | undefined;
}) {
    return (
        <div className="w-full flex pt-5 pb-5 pr-14 pl-14 bg-gray-100 h-16 justify-between rounded-xl" >
            <div className="flex justify-center items-center">
                <p className="font-semibold text-lg ">Contributeurs <span className=" text-gray-500 font-normal text-base"> {contributornb} personnes</span></p>

            </div>
            <div className="flex gap-2">
                {owner && <div className="flex justify-center items-center gap-1" key={owner.id}>
                    <p className="w-7 h-7 rounded-full bg-[#FFE8D9] text-sm flex justify-center items-center">
                        {owner.name.substring(0, 2).toUpperCase()}</p>
                    <p className="pt-1 pb-1 pr-4 pl-4 bg-[#FFE8D9] rounded-xl h-7 text-sm">{owner.name}</p></div>}
                {members &&
                    members.map((m) => (
                        <div className="flex justify-center items-center gap-1" key={m.id}>
                            <p className="w-7 h-7 rounded-full bg-gray-200 text-sm flex justify-center items-center">
                                {m.user.name.substring(0, 2).toUpperCase()}</p>
                            <p className="pt-1 pb-1 pr-4 pl-4 bg-gray-200 rounded-xl h-7 text-sm">
                                {m.user.name}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}