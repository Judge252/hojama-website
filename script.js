let slideIndex = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    const dotsContainer = document.querySelector('.dots-container');
    const slides = document.querySelectorAll('.slide');
    const track = document.querySelector('.slideshow-track');

    if (!slides.length) return;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => currentSlide(i);
        dotsContainer.appendChild(dot);
    });

    // Make first slide active
    slides[0].classList.add('active');

    // Initialize slideshow
    startSlideshow();

    // Pause on hover
    track.addEventListener('mouseenter', pauseSlideshow);
    track.addEventListener('mouseleave', startSlideshow);
});

function moveSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    slideIndex += n;

    // Handle wraparound
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    // Move track
    const track = document.querySelector('.slideshow-track');
    track.style.transform = `translateX(${-slideIndex * 100 / 3}%)`;

    // Update active states
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
}

function currentSlide(n) {
    slideIndex = n - 1;
    moveSlide(1);
}

function startSlideshow() {
    pauseSlideshow(); // Clear any existing interval
    slideInterval = setInterval(() => moveSlide(1), 5000);
}

function pauseSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// FAQ Toggle functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement
    const isActive = faqItem.classList.contains("active")

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active")
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "#fff"
    header.style.backdropFilter = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".benefit-card, .step, .feature, .booking-card, .faq-item")
  animatedElements.forEach((el) => {
    el.classList.add("loading")
    observer.observe(el)
  })
})

// WhatsApp button click tracking
document.querySelectorAll(".whatsapp-btn, .float-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Add click animation
    btn.style.transform = "scale(0.95)"
    setTimeout(() => {
      btn.style.transform = ""
    }, 150)

    // You can add analytics tracking here if needed
    console.log("WhatsApp button clicked")
  })
})

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
  const header = document.querySelector(".header")
  const mobileMenuBtn = document.createElement("button")
  mobileMenuBtn.className = "mobile-menu-btn"
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

  // Add mobile menu functionality here if needed
}

// Form validation for future contact forms
const validateForm = (form) => {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("error")
      isValid = false
    } else {
      input.classList.remove("error")
    }
  })

  return isValid
}

// Lazy loading for images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Preload critical resources
const preloadResources = () => {
  const criticalImages = ["/placeholder.svg?height=600&width=1200", "/placeholder.svg?height=400&width=500"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Initialize preloading
preloadResources()

// Performance optimization
const optimizePerformance = () => {
  // Debounce scroll events
  let scrollTimeout
  const originalScrollHandler = window.onscroll

  window.onscroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler()
      }
    }, 16) // ~60fps
  }
}

// Initialize performance optimizations
optimizePerformance()

// Add loading states for better UX
const addLoadingStates = () => {
  document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحويل...'

      setTimeout(() => {
        btn.innerHTML = originalText
      }, 2000)
    })
  })
}

// Initialize loading states
document.addEventListener("DOMContentLoaded", addLoadingStates)
