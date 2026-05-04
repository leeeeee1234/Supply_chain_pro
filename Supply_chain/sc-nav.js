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
    const topbarRight = document.querySelector('.topbar-right') || document.querySelector('.topbar > div:last-child');
    
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

  // Auto-connect unlinked buttons and nav links
  autoConnect() {
    document.body.addEventListener('click', (e) => {
      // Find closest link or button
      const btn = e.target.closest('a.nav-link-item, button, .btn-sc-primary, .btn-sc-ghost, .btn-add, .f-btn, .btn-sm-add');
      if (!btn) return;
      
      const text = btn.textContent.trim().toLowerCase();
      const isNav = btn.classList.contains('nav-link-item');
      
      if (isNav) {
        if (text.includes('dashboard') && text.includes('admin')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'dashboard-admin.html'; return;
        } else if (text.includes('dashboard')) {
            if (window.location.pathname.includes('admin') || window.location.pathname.includes('inventory') || window.location.pathname.includes('supplier')) {
                e.preventDefault(); e.stopPropagation(); window.location.href = 'dashboard-admin.html'; return;
            } else {
                e.preventDefault(); e.stopPropagation(); window.location.href = 'dashboard-client.html'; return;
            }
        } else if (text.includes('product catalog')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'retailer-product-catalog.html'; return;
        } else if (text.includes('order builder') || text.includes('create order')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'retailer-order-review-submit.html'; return;
        } else if (text.includes('my orders') || text.includes('my purchase orders')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'retailer-my-order-list.html'; return;
        } else if (text.includes('inventory')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'inventory-list.html'; return;
        } else if (text.includes('inbox') || text.includes('purchase orders')) {
            // Context-sensitive for supplier/admin side
            if (window.location.pathname.includes('admin') || window.location.pathname.includes('inventory') || window.location.pathname.includes('supplier')) {
                e.preventDefault(); e.stopPropagation(); window.location.href = 'supplier-purchase-order-inbox.html'; return;
            }
        } else if (text.includes('invoices') || text.includes('settings') || text.includes('retailers')) {
            e.preventDefault(); e.stopPropagation(); alert('Page not yet created.'); return;
        }
      } else {
        // Standard action buttons
        if (text.includes('view current order') || text.includes('go to order builder') || text.includes('review order')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'retailer-order-review-submit.html'; return;
        } else if (text.includes('add to order') || text === '+ add') {
            e.preventDefault(); e.stopPropagation();
            alert('Item added to order!');
            window.location.href = 'retailer-order-review-submit.html'; return;
        } else if (text.includes('view details') || text.includes('track order')) {
            e.preventDefault(); e.stopPropagation();
            let poNumber = 'PO-2026-000';
            const tr = btn.closest('tr');
            if(tr) {
                const poEl = tr.querySelector('.mono-lbl');
                if(poEl) poNumber = poEl.textContent;
            }
            const param = text.includes('track order') ? '&track=true' : '';
            window.location.href = 'retailer-order-detail-view.html?po=' + poNumber + param; return;
        } else if (text.includes('reorder')) {
            e.preventDefault(); e.stopPropagation(); window.location.href = 'retailer-order-review-submit.html?reorder=true'; return;
        } else if (text.includes('price list')) {
            e.preventDefault(); e.stopPropagation(); alert('Downloading Price List PDF...'); return;
        } else if (text.includes('export csv')) {
            e.preventDefault(); e.stopPropagation(); alert('Exporting CSV...'); return;
        }
      }
    }, true); // use capture phase to override inline `onclick="alert()"` 
  },

  // Initialize navigation
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.addHubButton();
        this.addKeyboardShortcuts();
        this.autoConnect();
      });
    } else {
      this.addHubButton();
      this.addKeyboardShortcuts();
      this.autoConnect();
    }
  }
};

// Auto-initialize
SupplyChainNav.init();
