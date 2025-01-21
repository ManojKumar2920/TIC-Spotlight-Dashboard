"use client";
import React, { useState } from 'react';
import CampaignTopNav from '@/components/Ad/Form1/CampaignTopNav';
import OrderSummaryTopNav from '@/components/Ad/Form2/OrderSummaryTopNav';
import Layout from '@/components/ReusableComponents/Siderbar/Layout';
import CampaignDetailsForm from '@/components/Ad/Form1/CampaignDetailsForm';
import OrderSummary from '@/components/Ad/Form2/OrderSummary';


type Step = 'campaignDetails' | 'orderSummary';

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('campaignDetails');

  const goToNextStep = (step: Step) => {
    setCurrentStep(step);
  };

  const goToPreviousStep = (step: Step) => {
    setCurrentStep(step);
  };

  const [campaignDetails, setCampaignDetails] = useState<any>(null);

    const handleCampaignSubmit = (campaignDetails: any) => {
        setCampaignDetails(campaignDetails);
    };
  return (
    <div className="min-h-screen bg-gray-100">
      <Layout>
        {currentStep === 'campaignDetails' && (
          <>
            <CampaignTopNav />
            <CampaignDetailsForm onSubmit={handleCampaignSubmit} goToNextStep={goToNextStep} campaignDetails={campaignDetails} />
          </>
        )}

        {currentStep === 'orderSummary' && campaignDetails && (
          <>
            <OrderSummaryTopNav onAddCreative={() => goToPreviousStep('campaignDetails')} />
            <OrderSummary onBack={() => goToPreviousStep('campaignDetails')}  campaignDetails={campaignDetails}/>
          </>
        )}
      </Layout>
    </div>
  );
};

export default Page;
