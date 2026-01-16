import React from 'react'
import {BookCheck,BookA,  User,  Power, Plus } from 'lucide-react';
function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-64 bg-[#2a3441] rounded-2xl p-6 shadow-lg">
        {/* Sidebar Title */}
        <h2 className="text-gray-300 text-3xl font-bold mb-8 px-2">
         Admin 
        </h2>

        {/* Menu Items */}
        <nav className="space-y-2">
          {/* Dashboard */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
            <div className="flex items-center gap-3">
             <BookCheck className="w-5 h-5 text-gray-400"/>
              <span className="text-gray-300 text-base">Courses</span>
            </div>
          </div>

          {/* E-Commerce */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <BookA className='w-5 h-5 text-gray-400' />
              <span className="text-gray-300 text-base">Add new course</span>
            </div>
            <Plus  className="w-4 h-4 text-gray-400"/>
          </div>

          {/* Profile */}
          <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300 text-base">Profile</span>
            </div>
          </div>
          {/* Log Out */}
          <div className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <Power className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300 text-base">Log Out</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
