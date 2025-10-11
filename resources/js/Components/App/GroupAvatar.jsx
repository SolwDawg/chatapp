import { UsersIcon } from '@heroicons/react/24/outline';

const GroupAvatar = () => {
    return (
        <>
            <div className={`avatar placeholder`}>
                <div className={`w-8 rounded-full bg-gray-400 text-gray-800`}>
                    <span className="text-xl">
                        <UsersIcon className="w-4" />
                    </span>
                </div>
            </div>
        </>
    );
};

export default GroupAvatar;
