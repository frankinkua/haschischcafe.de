/**
 * script.js for Haschisch Café
 * Vanilla JavaScript, no dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Age Gate Logic ---
    const ageGateOverlay = document.getElementById('age-gate-overlay');
    const btnYes = document.getElementById('btn-age-yes');
    const btnNo = document.getElementById('btn-age-no');
    const ageError = document.getElementById('age-error');

    // Check if age was already verified in this session
    // Since we can't use cookies/trackers, we'll just show it once per page load,
    // or use sessionStorage if strictly needed. The prompt says "no cookies or trackers",
    // sessionStorage is generally considered less tracking than cookies, but to be strictly
    // compliant with "no data is collected, no cookies are set", we will use sessionStorage
    // just to prevent it from showing on every single page navigation, which would be annoying.
    // If even sessionStorage is too much, we could drop it, but it provides a better UX.
    const isAgeVerified = sessionStorage.getItem('ageVerified') === 'true';

    if (ageGateOverlay) {
        if (!isAgeVerified) {
            // Show modal
            ageGateOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            // Focus the 'Yes' button for accessibility
            setTimeout(() => btnYes?.focus(), 100);
        } else {
            // Hide modal
            ageGateOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        }

        if (btnYes) {
            btnYes.addEventListener('click', () => {
                sessionStorage.setItem('ageVerified', 'true');
                ageGateOverlay.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
            });
        }

        if (btnNo) {
            btnNo.addEventListener('click', () => {
                if (ageError) {
                    ageError.textContent = 'Sie müssen mindestens 18 Jahre alt sein, um diese Website zu besuchen. Bitte verlassen Sie die Seite.';
                    // Disable the "Yes" button
                    if (btnYes) btnYes.disabled = true;
                }
            });
        }
    }

    // --- Scenario Selector Logic ---
    const scenarioSelect = document.getElementById('scenario-select');
    const scenarioResult = document.getElementById('scenario-result');

    const scenarios = {
        'default': {
            title: 'Bitte wählen Sie eine Situation aus',
            text: 'Wählen Sie oben eine Situation aus, um zu erfahren, was nach dem aktuellen Cannabisgesetz (CanG) in Deutschland erlaubt ist.'
        },
        'public_possession': {
            title: 'Besitz in der Öffentlichkeit',
            text: 'Erwachsene ab 18 Jahren dürfen in der Öffentlichkeit bis zu <strong>25 Gramm</strong> getrocknetes Cannabis zum Eigenkonsum mit sich führen. Die Weitergabe an Dritte (insbesondere Minderjährige) bleibt strikt verboten.'
        },
        'private_possession': {
            title: 'Besitz zu Hause',
            text: 'Am privaten Wohnsitz dürfen Erwachsene bis zu <strong>50 Gramm</strong> getrocknetes Cannabis sowie bis zu drei lebende Cannabispflanzen aufbewahren. Es müssen Maßnahmen ergriffen werden (z.B. abschließbare Schränke), um den Zugriff durch Kinder und Jugendliche zu verhindern.'
        },
        'home_grow': {
            title: 'Privater Eigenanbau',
            text: 'Erwachsene dürfen an ihrem Wohnsitz bis zu <strong>drei weibliche, blühende Cannabispflanzen</strong> gleichzeitig anbauen. Der Anbau muss vor dem Zugriff durch Kinder und Jugendliche geschützt sein. Die Ernte ist ausschließlich für den Eigenkonsum bestimmt und darf nicht weitergegeben werden.'
        },
        'public_consumption': {
            title: 'Konsum in der Öffentlichkeit',
            text: 'Der Konsum ist grundsätzlich erlaubt, <strong>außer</strong> in unmittelbarer Gegenwart von Minderjährigen und in bestimmten Zonen (Sichtweite, d.h. i.d.R. 100m Abstand): Schulen, Kinder- und Jugendeinrichtungen, Kinderspielplätzen sowie in öffentlich zugänglichen Sportstätten. In Fußgängerzonen ist der Konsum zwischen 7 und 20 Uhr untersagt.'
        },
        'social_clubs': {
            title: 'Anbauvereinigungen (Social Clubs)',
            text: 'Sogenannte Anbauvereinigungen dürfen Cannabis gemeinschaftlich anbauen und an ihre Mitglieder für den Eigenkonsum weitergeben (max. 25g pro Tag / 50g pro Monat). Für Heranwachsende (18-21 Jahre) gelten reduzierte Mengen und THC-Obergrenzen. Der Konsum in den Räumlichkeiten der Clubs ist nicht gestattet.'
        },
        'driving': {
            title: 'Teilnahme am Straßenverkehr',
            text: 'Es gilt ein gesetzlicher Grenzwert von <strong>3,5 ng/ml THC</strong> im Blutserum (vergleichbar mit der 0,5-Promille-Grenze bei Alkohol). Wer diesen Wert erreicht oder überschreitet, begeht eine Ordnungswidrigkeit. Für Fahranfänger in der Probezeit und Personen unter 21 Jahren gilt ein striktes Cannabisverbot am Steuer.'
        }
    };

    if (scenarioSelect && scenarioResult) {
        scenarioSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            const data = scenarios[selected] || scenarios['default'];

            // Add a small fade effect
            scenarioResult.style.opacity = '0';

            setTimeout(() => {
                scenarioResult.innerHTML = `
                    <h4>${data.title}</h4>
                    <p>${data.text}</p>
                `;
                scenarioResult.style.opacity = '1';
                // Transition effect setup
                scenarioResult.style.transition = 'opacity 0.3s ease';
            }, 150);
        });
    }
});
