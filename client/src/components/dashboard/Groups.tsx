import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Group = {
  id: number;
  title: string;
  icon: string;
  colorClass: string;
  searchQuery: string;
  memberCount: number;
  isJoined: boolean;
};

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      title: "Cardiology Research Network",
      icon: "favorite",
      colorClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      searchQuery: "cardiology research network medical",
      memberCount: 1247,
      isJoined: false
    },
    {
      id: 2,
      title: "Medical Imaging Specialists",
      icon: "image",
      colorClass: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      searchQuery: "medical imaging specialists radiology",
      memberCount: 892,
      isJoined: true
    },
    {
      id: 3,
      title: "Healthcare Technology Forum",
      icon: "biotech",
      colorClass: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
      searchQuery: "healthcare technology forum digital health",
      memberCount: 2156,
      isJoined: false
    },
    {
      id: 4,
      title: "Physician Leadership Guild",
      icon: "group",
      colorClass: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
      searchQuery: "physician leadership guild medical management",
      memberCount: 678,
      isJoined: true
    },
    {
      id: 5,
      title: "Medical Ethics Committee",
      icon: "balance",
      colorClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      searchQuery: "medical ethics committee bioethics",
      memberCount: 534,
      isJoined: false
    },
    {
      id: 6,
      title: "Emergency Medicine Alliance",
      icon: "local_hospital",
      colorClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      searchQuery: "emergency medicine alliance trauma care",
      memberCount: 1893,
      isJoined: false
    }
  ]);

  const [showMore, setShowMore] = useState(false);
  const [notification, setNotification] = useState<string>("");
  const displayGroups = showMore ? groups : groups.slice(0, 3);

  const handleGroupClick = (group: Group) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(group.searchQuery)}`;
    window.open(googleSearchUrl, '_blank');
    
    setNotification(`Searching for "${group.title}" on Google...`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleJoinGroup = (groupId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, isJoined: !group.isJoined }
          : group
      )
    );
    
    const group = groups.find(g => g.id === groupId);
    if (group) {
      setNotification(group.isJoined ? `Left ${group.title}` : `Joined ${group.title}!`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleAddGroup = () => {
    const googleGroupsUrl = "https://www.google.com/search?q=create+medical+professional+groups+online";
    window.open(googleGroupsUrl, '_blank');
    
    setNotification("Opening Google search for creating medical groups...");
    setTimeout(() => setNotification(""), 3000);
  };

  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="relative">
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}
      
      <Card className="shadow-card overflow-hidden">
        <CardHeader className="pb-3 border-b border-border dark:border-slate-700 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Medical Groups</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-8 w-8 text-text-secondary dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700"
            onClick={handleAddGroup}
            title="Find more medical groups"
          >
            <span className="material-icons text-lg">add</span>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border dark:divide-slate-700">
            {displayGroups.map((group) => (
              <li 
                key={group.id} 
                className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors duration-200"
                onClick={() => handleGroupClick(group)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${group.colorClass} transition-transform hover:scale-105`}>
                      <span className="material-icons text-lg">{group.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm dark:text-white mb-1">{group.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="material-icons text-xs">group</span>
                        <span>{formatMemberCount(group.memberCount)} members</span>
                        {group.isJoined && (
                          <>
                            <span>•</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Joined</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={group.isJoined ? "outline" : "default"}
                      size="sm"
                      onClick={(e) => handleJoinGroup(group.id, e)}
                      className={`text-xs px-3 py-1 h-7 ${
                        group.isJoined 
                          ? "border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20" 
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {group.isJoined ? "Joined" : "Join"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(group.searchQuery + " official website")}`;
                        window.open(googleSearchUrl, '_blank');
                      }}
                      title="Search for official website"
                    >
                      <span className="material-icons text-sm">launch</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {groups.length > 3 && (
            <div className="p-3 text-center border-t border-border dark:border-slate-700">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMore(!showMore)}
                className="text-sm text-primary dark:text-primary-300 font-medium w-full justify-center hover:bg-blue-50 dark:hover:bg-slate-800"
              >
                {showMore ? "Show less" : `Show ${groups.length - 3} more groups`}
                <span className="material-icons text-sm ml-1">{showMore ? "expand_less" : "expand_more"}</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            const exploreUrl = "https://www.google.com/search?q=medical+professional+groups+networks+online+communities";
            window.open(exploreUrl, '_blank');
          }}
        >
          <span className="material-icons text-sm mr-2">explore</span>
          Explore More Medical Communities
        </Button>
      </div>
    </div>
  );
};

export default Groups;