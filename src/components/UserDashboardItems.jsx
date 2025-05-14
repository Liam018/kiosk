import React from 'react'
import logo from '../assets/logo.png'
import schoolbg from '../assets/school-bg.png'

function UserDashboardItems() {
    return (
        <div className='bg-gray-100 p-4 transition-all ease-in-out duration-700 animate-fadeIn'>
          {/* Header with Logo and School Name */}
          <div className="flex items-center justify-start mb-4">
            <img
              src={logo}
              alt="School Logo"
              className="w-15 h-15 mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Castor Z. Concepcion Memorial National High School
              </h1>
              <p className="text-lg text-yellow-400 font-semibold italic">
                "Cultivating the Zeal of Champions"
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center md:flex-row gap-6">
            {/* School Image */}
            <div className="md:w-1/2">
              <img
                src={schoolbg}
                alt="School Building"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Description */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold text-teal-800 mb-4">
                Castor Z. Concepcion Memorial National High School
                <p className="text-lg text-yellow-600 mb-4">
                Balaoan, La Union
              </p>
              </h2>
              
              <p className="text-black mb-4">
                Established in 1970 by then-Provincial Board Member Judge Castor Z. Concepcion, the school began as Balaoan Provincial High School with approximately 300 students and 25 learners per class, utilizing the first-ever school building—the Marcos Building. The institution has served its community for over fifty years, pursuing its goals through the harmonious collaboration of education stakeholders and established partnerships to bridge gaps and improve both its facilities and physical aspects of the school.
              </p>
              <p className="text-black mb-4">
                The school aims to develop students’ knowledge, skills, and attitudes, preparing them as holistic citizens in a child-friendly, gender-sensitive, safe, and motivating environment.
              </p>
              <p className="text-black mb-4">
                Teachers facilitate learning and consistently nurture each learner’s growth. As stewards of the institution, administrators and staff ensure an enabling and supportive environment conducive to learning. In harmony with the community and other stakeholders, the school actively engages families, the community, and other stakeholders, fostering shared responsibility in developing lifelong learners.
              </p>
              <p className="text-lg text-teal-800 font-bold">
                3 core values:
              </p>
              <p className="text-yellow-600">
                MakaDiyos, MakaTao, Makakalikasan
              </p>
            </div>
          </div>
        </div>
      );
}

export default UserDashboardItems