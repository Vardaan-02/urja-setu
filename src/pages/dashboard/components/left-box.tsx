import { Box } from "./box";
import { Calendar } from "./calender";import { Goals } from "./goals";
import RedeemStore from "./redeem-store";
import { UserCard } from "./user-card";

export function LeftBox() {
  // User
  const user = {
    name: "Vardaan-02",
    address: "Rana Complex",
    avatarUrl: "profile.jpg",
  };

  // Example marked dates
  const markedDates = [
    {
      date: new Date(2024, 11, 15),
      type: "type3",
    },
    {
      date: new Date(2024, 11, 24),
      type: "type2",
    },
    {
      date: new Date(2024, 11, 20),
      type: "type3",
    },
  ];

  return (
    <Box className="flex flex-col gap-2 backdrop-blur-sm rounded-lg p-4 bg-green-50 shadow-xl">
      <UserCard user={user} />
      <Calendar markedDates={markedDates} />
      <Goals better={20} title="Weekly target" progress={12} total={20} trend="up"/>
      <RedeemStore/>
    </Box>
  );
}
