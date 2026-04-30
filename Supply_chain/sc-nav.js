// SupplyChain Pro - Interactive Navigation System
// Provides unified navigation across all pages

const SupplyChainNav = {
  pages: {
    'hub': { name: 'Hub', url: 'index.html', icon: '🏠' },
    'dashboard-admin': { name: 'Admin Dashboard', url: 'dashboard-admin.html', icon: '📊' },
    'dashboard-client': { name: 'Retailer Dashboard', url: 'dashboard-client.html', icon: '🎯' },
    'inventory-list': { name: 'Inventory', url: 'inventory-list.html', icon: '📦' },
    'retailer-my-order-list': { name: 'My Orders', url: 'retailer-my-order-list.html', icon: '📋' },
    'retailer-order-detail-view': { name: 'Order Details', url: 'retailer-order-detail-view.html', icon: '📄' },
    'retailer-order-review-submit': { name: 'Create Order', url: 'retailer-order-review-submit.html', icon: '✍️' },
    'retailer-product-catalog': { name: 'Product Catalog', url: 'retailer-product-catalog.html', icon: '🛒' },
    'supplier-purchase-order-inbox': { name: 'PO Inbox', url: 'supplier-purchase-order-inbox.html', icon: '📥' }
  },

  getCurrentPage() {
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    for (let key in this.pages) {
      if (this.pages[key].url === filename) {
        return key;
      }
    }
    return null;
  },

  // Add hub button to topbar
  addHubButton() {
    const topbar = document.querySelector('.topbar');
    const topbarRight = document.querySelector('.topbar-right');
    
    if (!topbar || !topbarRight) return;

    const hubLink = document.createElement('a');
    hubLink.href = 'index.html';
    hubLink.className = 'hub-nav-btn';
    hubLink.innerHTML = '🏠 Back to Hub';
    hubLink.style.cssText = `
      background: #f0f4f8;
      border: 1px solid #dde4ef;
      color: #1a2a3a;
      border-radius: 7px;
      padding: 7px 18px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    `;
    
    hubLink.onmouseover = function() {
      this.style.borderColor = '#035e7b';
      this.style.color = '#035e7b';
    };
    
    hubLink.onmouseout = function() {
      this.style.borderColor = '#dde4ef';
      this.style.color = '#1a2a3a';
    };

    topbarRight.insertBefore(hubLink, topbarRight.firstChild);
  },

  // Add keyboard shortcuts
  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        switch(e.key) {
          case 'h':
            window.location.href = 'index.html';
            break;
          case 'd':
            window.location.href = 'dashboard-admin.html';
            break;
          case 'r':
            window.location.href = 'retailer-product-catalog.html';
            break;
          case 'o':
            window.location.href = 'retailer-my-order-list.html';
            break;
          case 'i':
            window.location.href = 'inventory-list.html';
            break;
        }
      }
    });
  },

  // Initialize navigation
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.addHubButton();
        this.addKeyboardShortcuts();
      });
    } else {
      this.addHubButton();
      this.addKeyboardShortcuts();
    }
  }
};

// Auto-initialize
SupplyChainNav.init();
