import React from 'react';
import { Users, DollarSign, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About Budget Tracker</h2>
      
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          Budget Tracker is your personal finance companion, designed to help you take control of your spending 
          and achieve your financial goals. With intuitive budget management and expense tracking, we make it 
          easy to understand and manage your finances.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Budgeting</h3>
          <p className="text-gray-600">Create and manage budgets for different spending categories</p>
        </div>
        
        <div className="text-center">
          <div className="bg-green-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Goals</h3>
          <p className="text-gray-600">Set financial goals and track your progress over time</p>
        </div>
        
        <div className="text-center">
          <div className="bg-purple-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
          <p className="text-gray-600">Simple and intuitive interface for users of all experience levels</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          We believe that financial freedom starts with understanding and controlling your spending habits. 
          Our mission is to provide you with the tools and insights needed to make informed financial decisions 
          and achieve your monetary goals.
        </p>
      </div>
    </div>
  );
};

export default About;