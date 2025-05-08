import React, { useEffect, useRef } from 'react';

const BudgetSummaryChart = ({ budgets, expenses }) => {
  const canvasRef = useRef(null);
  
  // Prepare data for chart
  const prepareChartData = () => {
    return budgets.map(budget => {
      const budgetExpenses = expenses.filter(expense => expense.budgetId === budget.id);
      const totalSpent = budgetExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      const remaining = Math.max(0, parseFloat(budget.amount) - totalSpent);
      
      return {
        name: budget.name,
        spent: totalSpent,
        remaining: remaining,
        color: budget.color || '#3B82F6'
      };
    });
  };
  
  useEffect(() => {
    if (!canvasRef.current || budgets.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    
    // Set canvas size
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const data = prepareChartData();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Draw pie chart
    let startAngle = 0;
    let total = data.reduce((sum, item) => sum + item.spent + item.remaining, 0);
    
    if (total === 0) {
      // If there's no data, draw a placeholder circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#E5E7EB';
      ctx.fill();
      
      // Display no data message
      ctx.fillStyle = '#6B7280';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No budget data to display', centerX, centerY);
      return;
    }
    
    // Draw chart segments
    data.forEach((item, index) => {
      // Draw spent portion
      if (item.spent > 0) {
        const spentAngle = (item.spent / total) * (2 * Math.PI);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + spentAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Save midpoint angle for label
        const midAngle = startAngle + (spentAngle / 2);
        
        startAngle += spentAngle;
      }
      
      // Draw remaining portion
      if (item.remaining > 0) {
        const remainingAngle = (item.remaining / total) * (2 * Math.PI);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + remainingAngle);
        ctx.closePath();
        ctx.fillStyle = `${item.color}50`; // Add transparency for remaining
        ctx.fill();
        
        startAngle += remainingAngle;
      }
    });
    
    // Draw center circle (donut chart style)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    
    // Draw total in center
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Budget Usage', centerX, centerY - 10);
    
    // Draw a legend below the chart
    const legendY = centerY + radius + 10;
    const legendItemWidth = canvas.width / (data.length + 1);
    const legendItemHeight = 20;
    
    data.forEach((item, index) => {
      const legendX = (index + 1) * legendItemWidth;
      
      // Draw color box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX - 40, legendY, 15, 15);
      
      // Draw label
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.name, legendX - 20, legendY + 7);
    });
    
  }, [budgets, expenses]);
  
  return (
    <div className="h-full w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default BudgetSummaryChart;