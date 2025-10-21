
    // tiny helper functions
    function id(n) { return document.getElementById(n); }
    function qs(s) { return document.querySelector(s); }
    function qsa(s) { return document.querySelectorAll(s); }

    // show current year
    id('year').textContent = new Date().getFullYear();

    // MOBILE MENU: toggle show/hide
    var hamburger = id('hamburger');
    var mobileMenu = id('mobileMenu');
    hamburger.addEventListener('click', function () {
      if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.style.display = 'block';
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu on mobile link click (and smooth scroll)
    var mobileLinks = document.getElementsByClassName('mobile-link');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        mobileMenu.style.display = 'none';
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // THEME: dark/light toggle, stored in localStorage
    var themeSwitch = id('themeSwitch');
    var saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark') {
      document.body.classList.add('dark');
      themeSwitch.classList.add('on');
      themeSwitch.setAttribute('aria-checked', 'true');
    } else {
      themeSwitch.setAttribute('aria-checked', 'false');
    }
    themeSwitch.addEventListener('click', function () {
      var on = themeSwitch.classList.contains('on');
      if (on) {
        themeSwitch.classList.remove('on');
        document.body.classList.remove('dark');
        themeSwitch.setAttribute('aria-checked', 'false');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        themeSwitch.classList.add('on');
        document.body.classList.add('dark');
        themeSwitch.setAttribute('aria-checked', 'true');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
    themeSwitch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeSwitch.click();
      }
    });

    // OPEN buttons: open target link if provided (otherwise alert)
    var openBtns = document.getElementsByClassName('open-btn');
    for (var j = 0; j < openBtns.length; j++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var link = btn.getAttribute('data-link');
          if (link && link !== '#') {
            window.open(link, '_blank', 'noopener');
          } else {
            alert('No link provided. Replace data-link="#" with your lab/project URL.');
          }
        });
      })(openBtns[j]);
    }

    // CONTACT FORM: simple validation
    var form = id('contactForm');
    var formMsg = id('formMsg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formMsg.textContent = '';
      var name = id('name').value.trim();
      var email = id('email').value.trim();
      var message = id('message').value.trim();

      if (name.length < 3) {
        formMsg.textContent = 'Please enter your name (3+ characters).';
        id('name').focus();
        return;
      }
      if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        formMsg.textContent = 'Please enter a valid email address.';
        id('email').focus();
        return;
      }
      if (message.length < 10) {
        formMsg.textContent = 'Please write at least 10 characters.';
        id('message').focus();
        return;
      }

      formMsg.style.color = 'limegreen';
      formMsg.textContent = 'Message sent — thank you! (Demo)';
      form.reset();
      setTimeout(function () {
        formMsg.textContent = '';
        formMsg.style.color = '';
      }, 3000);
    });

    // NAV LINKS smooth scroll (desktop)
    var navLinks = document.getElementsByClassName('nav-link');
    for (var k = 0; k < navLinks.length; k++) {
      navLinks[k].addEventListener('click', function (e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      var target = e.target;
      var inside = mobileMenu.contains(target) || hamburger.contains(target);
      if (!inside && mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    /* ===== SKILLS ANIMATION =====
       When the resume/skills section is visible, fill bars.
       Simple check on scroll using bounding box.
    */
    var skillsAnimated = false;
    function animateSkillsIfVisible() {
      if (skillsAnimated) return;
      var resumeSection = document.getElementById('resume');
      var rect = resumeSection.getBoundingClientRect();
      // if top is within 85% of viewport height, animate
      if (rect.top < window.innerHeight * 0.85) {
        skillsAnimated = true;
        // list of fill elements and their targets
        var list = [
          { el: id('html-fill'), p: id('p-html'), target: 90 },
          { el: id('css-fill'), p: id('p-css'), target: 85 },
          { el: id('js-fill'), p: id('p-js'), target: 80 },
          { el: id('java-fill'), p: id('p-java'), target: 75 },
          { el: id('cs-fill'), p: id('p-cs'), target: 70 }
        ];
        for (var i = 0; i < list.length; i++) {
          (function (item) {
            // animate width
            item.el.style.width = item.target + '%';
            // ensure percent text matches (in case user changes numbers)
            item.p.textContent = item.target + '%';
          })(list[i]);
        }
        // no need to check again
        window.removeEventListener('scroll', animateSkillsIfVisible);
      }
    }
    // run on load and on scroll
    window.addEventListener('load', animateSkillsIfVisible);
    window.addEventListener('scroll', animateSkillsIfVisible);
   



    