"use client";
import React, { useState } from 'react';
import CampaignDetailsForm from '@/components/Ad/Form1/CampaignDetailsForm';
import CampaignTopNav from '@/components/Ad/Form1/CampaignTopNav';
import ParameterForm from '@/components/Ad/Form1/ParameterForm';
import OrderSummary from '@/components/Ad/Form2/OrderSummary';
import OrderSummaryTopNav from '@/components/Ad/Form2/OrderSummaryTopNav';
import RenderModelForm from '@/components/Ad/Form2/RenderModelForm';
import Layout from '@/components/ReusableComponents/Siderbar/Layout';

type Step = 'campaignDetails' | 'orderSummary';

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('campaignDetails');

  const goToNextStep = (step: Step) => {
    setCurrentStep(step);
  };

  const goToPreviousStep = (step: Step) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Layout>
        {currentStep === 'campaignDetails' && (
          <>
            <CampaignTopNav />
            <div className="flex flex-col lg:flex-row md:flex-row gap-4 p-3 mt-3 flex-grow h-screen">
              
              <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white shadow-md">
                <div className="w-full p-4 dark:bg-[#1e1e1e]">
                  <CampaignDetailsForm />
                </div>
              </div>
              
              <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white  shadow-md">
                <div className="w-full p-4 dark:bg-[#1e1e1e]">
                  <ParameterForm onNext={() => goToNextStep('orderSummary')} />
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 'orderSummary' && (
          <>
            <OrderSummaryTopNav onAddCreative={() => goToPreviousStep('campaignDetails')} />
            <div className="flex flex-col lg:flex-row md:flex-row md:h-auto gap-4 p-3 mt-3 flex-grow h-screen">
              
              <div className="flex-1 flex items-stretch justify-center rounded-[12px] dark:bg-[#1e1e1e] bg-white shadow-md">
                <div className="w-full p-4">
                <RenderModelForm onBack={() => goToPreviousStep('campaignDetails')} />
                </div>
              </div>
              
              <div className="flex-1 flex items-stretch justify-center rounded dark:bg-[#1e1e1e] bg-white shadow-md">
                <div className="w-full p-4">
                  <OrderSummary />
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Page;
