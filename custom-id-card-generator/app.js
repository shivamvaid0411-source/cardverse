function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('visitor_session_id');
    if (!sessionId) {
        sessionId = 'anon_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
}
const currentSessionId = getOrCreateSessionId();

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // OPTIONAL SUPABASE INTEGRATION SETUP
    // -------------------------------------------------------------
    const SUPABASE_URL = 'https://gldnlcedzdhdbyykrvvs.supabase.co'; // e.g., 'https://xyzcompany.supabase.co'
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZG5sY2VkemRoZGJ5eWtydnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNDI4OTIsImV4cCI6MjEwMjgxODg5Mn0.WDgla3uUCf2rrjbkPK7TJKpK9ulsRJLaRsgcHTTtpVM'; // e.g., 'eyJhbGciOiJIUzI1Ni...'

    let supabaseClient = null;
    if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // -------------------------------------------------------------
    // 4 FRANCHISE THEMES CONFIGURATION
    // -------------------------------------------------------------
    const THEMES = [
        {
            id: 'pokemon',
            name: 'Pokémon Trainer Card',
            categoryBadge: 'POKÉDEX REGISTRY',
            cardWidth: '500px',
            templateImg: 'assets/pokemon_trainer.jpg',
            pageThemeClass: 'page-theme-pokemon',
            fontFamily: "'Press Start 2P', monospace",
            textColor: '#1c2833',
            photoBox: { top: '59.2%', left: '5.0%', width: '38.5%', height: '33.5%' },
            fields: [
                { id: 'poke_id_front', label: 'ID No.', top: '5.5%', left: '59.0%', width: '27%', defaultText: '007849', fontSize: '0.85rem' },
                { id: 'poke_name_front', label: 'Name', top: '15.0%', left: '16.5%', width: '36%', defaultText: 'ASH KETCHUM', fontSize: '0.8rem' },
                { id: 'poke_money_front', label: 'Money', top: '20.8%', left: '21.5%', width: '28%', defaultText: '$999,999', fontSize: '0.75rem' },
                { id: 'poke_dex_front', label: 'Pokédex', top: '26.5%', left: '21.5%', width: '28%', defaultText: '151 / 151', fontSize: '0.75rem' },
                { id: 'poke_time_front', label: 'Play Time', top: '32.2%', left: '21.5%', width: '28%', defaultText: '250:45', fontSize: '0.75rem' },
                { id: 'poke_name_back', label: 'Name', top: '60.8%', left: '53.0%', width: '38%', defaultText: 'ASH KETCHUM', fontSize: '0.8rem' },
                { id: 'poke_id_back', label: 'ID No.', top: '64.6%', left: '53.0%', width: '38%', defaultText: '007849', fontSize: '0.8rem' },
                { id: 'poke_money_back', label: 'Money', top: '68.4%', left: '53.0%', width: '38%', defaultText: '$999,999', fontSize: '0.75rem' },
                { id: 'poke_dex_back', label: 'Pokédex', top: '72.2%', left: '53.0%', width: '38%', defaultText: '151 / 151', fontSize: '0.75rem' },
                { id: 'poke_time_back', label: 'Play Time', top: '76.0%', left: '53.0%', width: '38%', defaultText: '250:45', fontSize: '0.75rem' },
                { id: 'poke_notes_back', label: 'Notes', top: '84.5%', left: '48.0%', width: '43%', defaultText: 'PALLET TOWN CHAMPION', font: "'Courier Prime', monospace", fontSize: '0.85rem' }
            ]
        },
        {
            id: 'hero',
            name: 'Provisional Hero License',
            categoryBadge: 'U.A. HIGH HERO REGISTRY',
            cardWidth: '510px',
            templateImg: 'assets/hero_license.jpg',
            pageThemeClass: 'page-theme-hero',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textColor: '#0f172a',
            photoBox: { top: '13.5%', left: '65.5%', width: '27.5%', height: '24.0%' },
            fields: [
                { id: 'hero_name', label: 'Name', top: '14.5%', left: '11.5%', width: '51%', defaultText: 'Izuku Midoriya', fontSize: '0.85rem' },
                { id: 'hero_agency', label: 'Agency', top: '19.0%', left: '12.5%', width: '50%', defaultText: 'Might Agency', fontSize: '0.85rem' },
                { id: 'hero_grade', label: 'Grade', top: '23.5%', left: '11.5%', width: '51%', defaultText: 'Class 1-A Hero', fontSize: '0.85rem' },
                { id: 'hero_issued', label: 'Issued', top: '28.0%', left: '11.5%', width: '51%', defaultText: '2026-08-20', fontSize: '0.85rem' },
                { id: 'hero_quirk', label: 'Quirk', top: '32.5%', left: '10.5%', width: '52%', defaultText: 'One For All', fontSize: '0.85rem' },
                { id: 'hero_code_name', label: 'Hero Name', top: '37.8%', left: '9.0%', width: '53%', defaultText: 'DEKU', fontSize: '1.6rem' },
                { id: 'hero_id_num', label: 'ID#', top: '3.2%', left: '74.0%', width: '11%', defaultText: '98402', fontSize: '0.7rem', font: "'Courier Prime', monospace" },
                { id: 'hero_reff_num', label: 'Reff#', top: '5.2%', left: '74.0%', width: '11%', defaultText: '7721', fontSize: '0.7rem', font: "'Courier Prime', monospace" },
                { id: 'hero_dob', label: 'DOB', top: '44.0%', left: '66.0%', width: '10%', defaultText: '07/15', fontSize: '0.7rem' },
                { id: 'hero_height', label: 'Height', top: '44.0%', left: '81.5%', width: '10%', defaultText: '166cm', fontSize: '0.7rem' },
                { id: 'hero_name_back', label: 'Name', top: '61.8%', left: '46.0%', width: '46%', defaultText: 'Izuku Midoriya', fontSize: '0.85rem' },
                { id: 'hero_id_back', label: 'ID#', top: '66.0%', left: '44.0%', width: '15%', defaultText: '98402', fontSize: '0.85rem', font: "'Courier Prime', monospace" },
                { id: 'hero_reff_back', label: 'Reff#', top: '66.0%', left: '75.0%', width: '17%', defaultText: '7721', fontSize: '0.85rem', font: "'Courier Prime', monospace" },
                { id: 'hero_agency_back', label: 'Agency', top: '70.2%', left: '47.0%', width: '45%', defaultText: 'Might Agency', fontSize: '0.85rem' },
                { id: 'hero_grade_back', label: 'Grade', top: '74.5%', left: '46.0%', width: '46%', defaultText: 'Class 1-A Hero', fontSize: '0.85rem' },
                { id: 'hero_issued_back', label: 'Issued', top: '78.8%', left: '46.0%', width: '46%', defaultText: '2026-08-20', fontSize: '0.85rem' },
                { id: 'hero_quirk_back', label: 'Quirk', top: '83.0%', left: '46.0%', width: '46%', defaultText: 'One For All', fontSize: '0.85rem' }
            ]
        },
        {
            id: 'fight_club',
            name: 'Fight Club ID Card',
            categoryBadge: 'PROJECT MAYHEM PASS',
            cardWidth: '550px',
            templateImg: 'assets/fight_club.jpg',
            pageThemeClass: 'page-theme-fight_club',
            fontFamily: "'Courier Prime', monospace",
            textColor: '#111111',
            photoBox: { top: '9.0%', left: '7.0%', width: '30.5%', height: '30.0%' },
            fields: [
                { id: 'fc_name_cn', label: 'Chinese Name', top: '7.5%', left: '48.0%', width: '42%', defaultText: '泰勒 德顿', fontSize: '0.85rem' },
                { id: 'fc_name_en', label: 'English Name', top: '14.0%', left: '48.0%', width: '42%', defaultText: 'TYLER DURDEN', fontSize: '0.9rem' },
                { id: 'fc_grade', label: 'Grade', top: '20.5%', left: '48.0%', width: '42%', defaultText: 'FOUNDER / GRADE A', fontSize: '0.8rem' },
                { id: 'fc_service', label: 'Service No', top: '26.5%', left: '48.0%', width: '42%', defaultText: 'FC-632025', fontSize: '0.8rem' },
                { id: 'fc_age', label: 'Age', top: '32.5%', left: '48.0%', width: '42%', defaultText: '30', fontSize: '0.8rem' },
                { id: 'fc_section', label: 'Section', top: '38.5%', left: '48.0%', width: '42%', defaultText: 'SOAP DIVISION', fontSize: '0.8rem' },
                { id: 'fc_date_exp', label: 'Date Expired', top: '44.5%', left: '48.0%', width: '42%', defaultText: '2099-12-31', fontSize: '0.8rem' },
                { id: 'fc_serial', label: 'Serial No', top: '40.5%', left: '6.5%', width: '31%', defaultText: '632025', fontSize: '1.2rem' },
                { id: 'fc_subj_name', label: 'Subject Name', top: '58.0%', left: '6.5%', width: '26%', defaultText: 'THE NARRATOR', fontSize: '0.8rem' },
                { id: 'fc_alias', label: 'Alias', top: '62.5%', left: '6.5%', width: '26%', defaultText: 'JACK', fontSize: '0.8rem' },
                { id: 'fc_blood', label: 'Blood Group', top: '67.0%', left: '6.5%', width: '26%', defaultText: 'O POSITIVE', fontSize: '0.8rem' },
                { id: 'fc_height', label: 'Height', top: '71.5%', left: '6.5%', width: '26%', defaultText: '6 FT 0 IN', fontSize: '0.8rem' },
                { id: 'fc_weight', label: 'Weight', top: '76.0%', left: '6.5%', width: '26%', defaultText: '175 LBS', fontSize: '0.8rem' },
                { id: 'fc_eyes', label: 'Eyes', top: '80.5%', left: '6.5%', width: '26%', defaultText: 'BLUE', fontSize: '0.8rem' },
                { id: 'fc_nationality', label: 'Nationality', top: '85.0%', left: '6.5%', width: '26%', defaultText: 'AMERICAN', fontSize: '0.8rem' },
                { id: 'fc_language', label: 'Language', top: '89.5%', left: '6.5%', width: '26%', defaultText: 'ENGLISH', fontSize: '0.8rem' },
                { id: 'fc_inmate_no', label: 'Inmate No', top: '58.0%', left: '35.5%', width: '26%', defaultText: '94021', fontSize: '0.8rem' },
                { id: 'fc_service_back', label: 'Service No', top: '63.0%', left: '35.5%', width: '26%', defaultText: 'FC-632025', fontSize: '0.8rem' },
                { id: 'fc_date_issue', label: 'Date of Issue', top: '69.0%', left: '35.5%', width: '26%', defaultText: '1999-10-15', fontSize: '0.8rem' },
                { id: 'fc_date_expiry_back', label: 'Date of Expiry', top: '74.0%', left: '35.5%', width: '26%', defaultText: 'NEVER', fontSize: '0.8rem' },
                { id: 'fc_auth_by', label: 'Authorized By', top: '89.5%', left: '35.5%', width: '18%', defaultText: 'T. DURDEN', fontSize: '0.8rem' }
            ]
        },
        {
            id: 'mib',
            name: 'Men In Black Badge',
            categoryBadge: 'TOP SECRET MIB AGENT',
            cardWidth: '550px',
            templateImg: 'assets/mib_agent.jpg',
            pageThemeClass: 'page-theme-mib',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            textColor: '#ffffff',
            photoBox: { top: '34.8%', left: '8.0%', width: '23.5%', height: '34.5%' },
            fields: [
                { id: 'mib_desig', label: 'Agent Designation', top: '39.0%', left: '33.0%', width: '13%', defaultText: 'J', fontSize: '4.5rem', color: '#ffffff' },
                { id: 'mib_race', label: 'Race', top: '73.2%', left: '30.0%', width: '17%', defaultText: 'HUMAN', fontSize: '0.75rem', font: "'Courier Prime', monospace", color: '#ffffff' },
                { id: 'mib_role', label: 'Role', top: '77.8%', left: '30.0%', width: '17%', defaultText: 'SENIOR AGENT', fontSize: '0.75rem', font: "'Courier Prime', monospace", color: '#ffffff' }
            ]
        }
    ];

    // DOM Elements
    const themeCardsGrid = document.getElementById('themeCardsGrid');
    const activeThemeTitle = document.getElementById('activeThemeTitle');
    const themeCategoryBadge = document.getElementById('themeCategoryBadge');
    const cardTemplateImg = document.getElementById('cardTemplateImg');
    const overlayLayer = document.getElementById('overlayLayer');
    const cardCanvas = document.getElementById('cardCanvas');
    const downloadBtn = document.getElementById('downloadBtn');
    const globalPhotoInput = document.getElementById('globalPhotoInput');
    const addCustomTextBtn = document.getElementById('addCustomTextBtn');
    const changePhotoToolBtn = document.getElementById('changePhotoToolBtn');

    const textColorPicker = document.getElementById('textColorPicker');
    const colorSwatches = document.querySelectorAll('.swatch');

    let currentThemeIndex = 0;
    let activeFocusedField = null;
    let uploadedPhotoSrc = 'assets/doodle_avatar.svg';

    // 1. Delegated Theme Switcher Listener
    themeCardsGrid.addEventListener('click', (e) => {
        const themeCard = e.target.closest('.theme-selection-card');
        if (!themeCard) return;

        const idx = parseInt(themeCard.getAttribute('data-theme-index'), 10);
        if (!isNaN(idx) && idx >= 0 && idx < THEMES.length) {
            loadTheme(idx);
        }
    });

    function loadTheme(index) {
        currentThemeIndex = index;
        const theme = THEMES[index];

        const allCards = themeCardsGrid.querySelectorAll('.theme-selection-card');
        allCards.forEach((c, i) => {
            if (i === index) c.classList.add('active');
            else c.classList.remove('active');
        });

        // Full Page Theme Transformation
        document.body.className = theme.pageThemeClass;
        activeThemeTitle.textContent = theme.name;
        if (themeCategoryBadge) themeCategoryBadge.textContent = theme.categoryBadge;

        if (theme.cardWidth) {
            cardCanvas.style.maxWidth = theme.cardWidth;
        }

        cardTemplateImg.src = theme.templateImg;
        overlayLayer.innerHTML = '';

        // Add Photo Box Overlay
        if (theme.photoBox) {
            const photoBox = document.createElement('div');
            photoBox.className = 'photo-overlay-box';
            photoBox.style.top = theme.photoBox.top;
            photoBox.style.left = theme.photoBox.left;
            photoBox.style.width = theme.photoBox.width;
            photoBox.style.height = theme.photoBox.height;
            photoBox.title = 'Click to change photo / Drag to move / Drag bottom-right corner to resize';

            const photoImg = document.createElement('img');
            photoImg.id = 'activeCardPhoto';
            photoImg.src = uploadedPhotoSrc;

            const promptText = document.createElement('div');
            promptText.className = 'photo-prompt-text';
            promptText.textContent = '📷 CHANGE PHOTO';

            photoBox.appendChild(photoImg);
            photoBox.appendChild(promptText);

            photoBox.addEventListener('click', () => {
                if (!photoBox.isDragging) {
                    globalPhotoInput.click();
                }
            });

            makeElementDraggableAndResizable(photoBox, false);
            overlayLayer.appendChild(photoBox);
        }

        // Add In-Card Fields
        if (theme.fields) {
            theme.fields.forEach(field => {
                const el = document.createElement('div');
                el.className = 'field-overlay';
                el.contentEditable = 'true';
                el.spellcheck = false;
                el.setAttribute('data-placeholder', field.label);
                el.id = field.id;
                el.innerText = field.defaultText || '';

                el.style.top = field.top;
                el.style.left = field.left;
                el.style.width = field.width;
                if (field.fontSize) el.style.fontSize = field.fontSize;
                if (field.color) el.style.color = field.color;
                else if (theme.textColor) el.style.color = theme.textColor;

                if (field.font) el.style.fontFamily = field.font;
                else if (theme.fontFamily) el.style.fontFamily = theme.fontFamily;

                el.addEventListener('focus', () => {
                    activeFocusedField = el;
                    if (el.style.color) {
                        textColorPicker.value = rgbToHex(el.style.color) || '#ffffff';
                    }
                });

                makeElementDraggableAndResizable(el, true);
                overlayLayer.appendChild(el);
            });
        }
    }

    // 2. 🖐️ SINGLE 50% SMALLER CORNER RESIZE HANDLE (Bottom-Right ONLY) & DRAG REPOSITIONING
    function makeElementDraggableAndResizable(el, isTextField) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, initialLeft, initialTop, initialWidth, initialHeight, initialFontSize;

        // SINGLE Corner Handle Grip (Bottom-Right ONLY)
        const handle = document.createElement('div');
        handle.className = 'resize-handle';
        handle.title = 'Drag corner to resize';
        el.appendChild(handle);

        const startResize = (clientX, clientY, e) => {
            if (e) e.stopPropagation();
            isResizing = true;
            startX = clientX;
            startY = clientY;

            const rect = el.getBoundingClientRect();
            const parentRect = cardCanvas.getBoundingClientRect();

            initialLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
            initialTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
            initialWidth = (rect.width / parentRect.width) * 100;
            initialHeight = (rect.height / parentRect.height) * 100;
            initialFontSize = parseFloat(window.getComputedStyle(el).fontSize);

            const onMove = (moveX, moveY) => {
                if (!isResizing) return;
                const dx = moveX - startX;
                const dy = moveY - startY;

                const newWidth = Math.max(6, initialWidth + (dx / parentRect.width) * 100);
                el.style.width = `${newWidth}%`;

                if (!isTextField) {
                    const newHeight = Math.max(6, initialHeight + (dy / parentRect.height) * 100);
                    el.style.height = `${newHeight}%`;
                } else {
                    const scaleFactor = 1 + (dy / parentRect.height); // Scaled via vertical/diagonal drag down
                    const newFontSize = Math.max(9, Math.min(72, initialFontSize * scaleFactor));
                    el.style.fontSize = `${newFontSize}px`;
                }
            };

            const handleMouseMove = (moveEvent) => onMove(moveEvent.clientX, moveEvent.clientY);
            const handleTouchMove = (touchEvent) => {
                if (touchEvent.touches && touchEvent.touches[0]) {
                    onMove(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
                }
            };

            const handleUp = () => {
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleUp);
        };

        handle.addEventListener('mousedown', (e) => startResize(e.clientX, e.clientY, e));
        handle.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
                startResize(e.touches[0].clientX, e.touches[0].clientY, e);
            }
        }, { passive: false });

        // DRAG REPOSITIONING LISTENER
        const startDrag = (clientX, clientY, e) => {
            if (e && e.target.classList.contains('resize-handle')) return;
            if (document.activeElement === el && el.isContentEditable) return;

            isDragging = false;
            el.isDragging = false;
            startX = clientX;
            startY = clientY;

            const rect = el.getBoundingClientRect();
            const parentRect = cardCanvas.getBoundingClientRect();

            initialLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
            initialTop = ((rect.top - parentRect.top) / parentRect.height) * 100;

            const onMove = (moveX, moveY) => {
                const dx = moveX - startX;
                const dy = moveY - startY;

                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                    isDragging = true;
                    el.isDragging = true;
                }

                if (isDragging) {
                    const newLeft = initialLeft + (dx / parentRect.width) * 100;
                    const newTop = initialTop + (dy / parentRect.height) * 100;

                    el.style.left = `${Math.max(0, Math.min(92, newLeft))}%`;
                    el.style.top = `${Math.max(0, Math.min(95, newTop))}%`;
                }
            };

            const handleMouseMove = (moveEvent) => onMove(moveEvent.clientX, moveEvent.clientY);
            const handleTouchMove = (touchEvent) => {
                if (touchEvent.touches && touchEvent.touches[0]) {
                    onMove(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
                }
            };

            const handleUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleUp);
        };

        el.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY, e));
        el.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches[0]) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY, e);
            }
        }, { passive: false });
    }

    // 3. COLOR PICKER LISTENERS
    textColorPicker.addEventListener('input', (e) => {
        applyColorToActiveField(e.target.value);
    });

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-color');
            textColorPicker.value = color;
            applyColorToActiveField(color);
        });
    });

    function applyColorToActiveField(color) {
        if (activeFocusedField) {
            activeFocusedField.style.color = color;
        } else {
            const allFields = overlayLayer.querySelectorAll('.field-overlay');
            allFields.forEach(f => f.style.color = color);
        }
    }

    function rgbToHex(rgb) {
        if (rgb.startsWith('#')) return rgb;
        const rgbValues = rgb.match(/\d+/g);
        if (!rgbValues || rgbValues.length < 3) return '#ffffff';
        return '#' + rgbValues.slice(0, 3).map(x => parseInt(x, 10).toString(16).padStart(2, '0')).join('');
    }

    // 4. Custom Text Field Creation
    function createCustomTextField(percentLeft, percentTop) {
        const newField = document.createElement('div');
        newField.className = 'field-overlay custom-added-field';
        newField.contentEditable = 'true';
        newField.spellcheck = false;
        newField.setAttribute('data-placeholder', 'Type Text');
        newField.style.top = `${percentTop}%`;
        newField.style.left = `${percentLeft}%`;
        newField.style.width = '30%';
        newField.style.fontSize = '0.85rem';
        newField.style.fontFamily = THEMES[currentThemeIndex].fontFamily;
        newField.style.color = textColorPicker.value || '#ffffff';
        newField.innerText = 'Click to edit text';

        newField.addEventListener('focus', () => {
            activeFocusedField = newField;
        });

        makeElementDraggableAndResizable(newField, true);
        overlayLayer.appendChild(newField);
        newField.focus();

        const range = document.createRange();
        range.selectNodeContents(newField);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    addCustomTextBtn.addEventListener('click', () => {
        createCustomTextField(35, 45);
    });

    changePhotoToolBtn.addEventListener('click', () => {
        globalPhotoInput.click();
    });

    cardCanvas.addEventListener('dblclick', (e) => {
        if (e.target.closest('.field-overlay') || e.target.closest('.photo-overlay-box')) return;

        const rect = cardCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const percentLeft = Math.max(5, Math.min(80, (clickX / rect.width) * 100));
        const percentTop = Math.max(5, Math.min(90, (clickY / rect.height) * 100));

        createCustomTextField(percentLeft, percentTop);
    });

    // 5. Global Photo Input Reader
    globalPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedPhotoSrc = event.target.result;
                const activePhoto = document.getElementById('activeCardPhoto');
                if (activePhoto) activePhoto.src = uploadedPhotoSrc;
            };
            reader.readAsDataURL(file);
        }
    });

    // 6. 🔥 FLAWLESS FINISHED PNG EXPORT
    downloadBtn.addEventListener('click', async () => {
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Generating Finished Product PNG...';

        cardCanvas.classList.add('rendering-for-export');

        try {
            const canvas = await html2canvas(cardCanvas, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false
            });

            const currentTheme = THEMES[currentThemeIndex];
            const pngDataUrl = canvas.toDataURL('image/png');

            const nameField = overlayLayer.querySelector('.field-overlay');
            const userName = nameField ? (nameField.innerText.trim().replace(/[^a-z0-9]/gi, '_') || 'custom_user') : 'custom_user';

            const link = document.createElement('a');
            link.download = `${userName}_${currentTheme.id}_card.png`;
            link.href = pngDataUrl;
            link.click();

            if (supabaseClient) {
                // Collect every field the user typed on the card (name, gender,
                // ID number, whatever the theme has) into one object.
                const cardFields = {};
                overlayLayer.querySelectorAll('.field-overlay').forEach((fieldEl, i) => {
                    const key = fieldEl.id || fieldEl.getAttribute('data-placeholder') || `custom_field_${i}`;
                    cardFields[key] = fieldEl.innerText.trim();
                });
                saveCardToSupabase(userName, currentTheme.id, pngDataUrl, cardFields);
            }
        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to generate finished PNG. Please try again.');
        } finally {
            cardCanvas.classList.remove('rendering-for-export');

            downloadBtn.disabled = false;
            downloadBtn.innerHTML = `
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download High-Res PNG (Front + Back)
            `;
        }
    });

    async function saveCardToSupabase(userName, themeId, imageDataUrl, cardFields) {
        try {
            // A. Turn the base64 PNG into a real file
            const imageResponse = await fetch(imageDataUrl);
            const blobFile = await imageResponse.blob();
            const readyFile = new File([blobFile], 'card.png', { type: 'image/png' });

            // B. Unique path per card, grouped by session id
            const cloudFileName = `${currentSessionId}/${Date.now()}_card.png`;

            // C. Upload the image to the 'user-cards' bucket
            const { data: storageData, error: storageError } = await supabaseClient
                .storage
                .from('user-cards')
                .upload(cloudFileName, readyFile);

            if (storageError) throw storageError;

            // D. Save the structured row, pointing at the uploaded image
            const { data, error } = await supabaseClient
                .from('visitor_cards')
                .insert([
                    {
                        user_id: currentSessionId,
                        user_name: userName,
                        theme_id: themeId,
                        card_fields: cardFields,
                        image_path: storageData.path
                    }
                ]);
            if (error) console.error('Supabase save error:', error);
            else console.log('Successfully saved visitor card to Supabase:', data);
        } catch (err) {
            console.error('Database connection error:', err);
        }
    }

    // Initialize Theme 0
    loadTheme(0);
});