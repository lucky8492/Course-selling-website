import React from 'react'
import { Menu, X,  Twitter, Instagram, Linkedin, Mail,Github, MapPin } from 'lucide-react';

function Footer() {
  return (
 <footer className="backdrop-blur-lg  border-t border-white text-gray-300">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            {/* Left Side - Created by */}
            <div className="text-center  md:text-left">
              <div className='flex'>
                <h3 className="text-white text-xl mt-1 font-mono mb-4">Created by </h3>
                <p className='text-2xl ml-2 font-serif'>Lucky</p>
                </div>
              <div className="flex space-x-4 justify-center md:justify-start font-mono"> Follow me on :
                <a href="https://x.com/secretDOTenv" className="hover:text-blue-400 ml-2 transition "><X  size={28} /></a>
                <a href="#" className="hover:text-blue-400 transition"><Instagram size={22 } /></a>
                <a href="https://www.linkedin.com/in/lucky8492/" className="hover:text-blue-400 transition"><Linkedin size={22} /></a>
              </div>
            </div>

            {/* Right Side - Links */}
            <div className="text-center md:text-right">
              <ul className="space-y-2 text-sm">
                <li><a href="" className="hover:text-gray-400 transition border p-1 rounded-lg text-lg">Portfolio</a></li>
                <li className='flex border rounded-lg'>
                    <Github size={20} className='mt-2 ml-1 '/>
                    <a href="https://github.com/lucky8492" className="hover:text-gray-400  transition  p-1   rounded-lg  text-lg">
                        GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
