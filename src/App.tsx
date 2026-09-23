/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Calculator } from './components/Calculator';
import { Portfolio } from './components/Portfolio';
import { Reviews } from './components/Reviews';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { DirectTalkModal } from './components/DirectTalkModal';
import { OrdersDatabaseModal } from './components/OrdersDatabaseModal';
import { OrderRecord } from './types';

export default function App() {
  const [isDirectTalkOpen, setIsDirectTalkOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(3);
  const [recentOrder, setRecentOrder] = useState<OrderRecord | null>(null);

  const handleSelectMinutes = (minutes: number) => {
    setSelectedMinutes(minutes);
  };

  const scrollToOrder = () => {
    const el = document.getElementById('order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (order: OrderRecord) => {
    setRecentOrder(order);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenDirectTalk={() => setIsDirectTalkOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <Hero
          onBookDirectTalk={() => setIsDirectTalkOpen(true)}
          onScrollToOrder={scrollToOrder}
        />

        {/* 2. Services */}
        <Services />

        {/* 3. Pricing & Minutes Calculator */}
        <Calculator onSelectMinutes={handleSelectMinutes} />

        {/* 4. Portfolio Before/After */}
        <Portfolio />

        {/* 5. Reviews */}
        <Reviews />

        {/* 6. Order Form */}
        <OrderForm
          initialMinutes={selectedMinutes}
          onOrderSuccess={handleOrderSuccess}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        onOpenDirectTalk={() => setIsDirectTalkOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
      />

      {/* Modals */}
      <DirectTalkModal
        isOpen={isDirectTalkOpen}
        onClose={() => setIsDirectTalkOpen(false)}
      />

      <OrdersDatabaseModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </div>
  );
}
