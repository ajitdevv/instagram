import React from "react";

export default function InstaFooter() {
  const linksRow1 = [
    "Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms"
  ];

  const linksRow2 = [
    "Locations", "Popular", "Meta AI", "Threads"
  ];

  const linksRow3 = [
    "Contact Uploading & Non-Users", "Meta Verified"
  ];

  return (
    <footer className="mt-10 text-center text-xs text-gray-500 space-y-2">
      
      {/* Row 1 */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {linksRow1.map((item, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {item}
          </span>
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {linksRow2.map((item, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {item}
          </span>
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {linksRow3.map((item, index) => (
          <span key={index} className="cursor-pointer hover:underline">
            {item}
          </span>
        ))}
      </div>

      {/* Bottom Line */}
      <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
        
        <select className="bg-transparent outline-none text-xs cursor-pointer">
          <option>English</option>
          <option>Hindi</option>
        </select>

        <span>© 2026 Instagram from Meta</span>
      </div>

    </footer>
  );
}