import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { createSubscription } from '../../lib/stripe';
import { Users, User, CheckCircle } from 'lucide-react';

const plans = [
  {
    id: 'solo',
    name: 'Solo Plan',
    price: 29,
    type: 'solo',
    maxUsers: 1,
    features: [
      'All form types included',
      'PDF generation',
      'Email notifications',
      'Basic support',
      'Single user access',
    ],
    icon: User,
  },
  {
    id: 'company',
    name: 'Company Plan',
    price: 99,
    type: 'company',
    maxUsers: 4,
    features: [
      'All Solo Plan features',
      'Multiple user accounts (3+1)',
      'Team management',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
    ],
    icon: Users,
  },
];

export default function SubscriptionPlans() {
  const { user } = useAuth();

  const handleSubscribe = async (planId: string) => {
    try {
      await createSubscription(planId, user?.id as string);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your business needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  </p>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                  >
                    Subscribe to {plan.name}
                  </button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                    What's included
                  </h4>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <CheckCircle
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}