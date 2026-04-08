import type { User, ProjectMember } from "../../../types/user";

type HeaderProjectProps = {
  contributornb: string;
  owner: User | undefined;
  members: ProjectMember[] | undefined;
};

export default function HeaderProject({
  contributornb,
  owner,
  members,
}: HeaderProjectProps) {
  return (
    <div className="w-full flex flex-col gap-4 py-4 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-100 rounded-xl md:flex-row md:items-center md:justify-between">
      <div className="flex items-center">
        <p className="font-semibold text-base sm:text-lg text-[#1F1F1F]">
          Contributeurs
          <span className="text-gray-500 font-normal text-sm sm:text-base ml-2">
            {contributornb} personnes
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {owner && (
          <div className="flex items-center gap-1" key={owner.id}>
            <p className="w-8 h-8 rounded-full bg-[#FFE8D9] text-sm flex justify-center items-center shrink-0">
              {owner.name.substring(0, 2).toUpperCase()}
            </p>
            <p className="px-3 py-1 bg-[#FFE8D9] rounded-xl text-sm min-h-8 flex items-center">
              {owner.name}
            </p>
          </div>
        )}

        {members?.map((member) => (
          <div className="flex items-center gap-1" key={member.id}>
            <p className="w-8 h-8 rounded-full bg-gray-200 text-sm flex justify-center items-center shrink-0">
              {member.user.name.substring(0, 2).toUpperCase()}
            </p>
            <p className="px-3 py-1 bg-gray-200 rounded-xl text-sm min-h-8 flex items-center">
              {member.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
