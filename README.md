# JAFECO Construction — Vercel website (updated)

This is an expanded version of the original JAFECO site, keeping the **same approved official logo** (`public/jafeco-logo.png`), **deep blue #003366**, and **sunset yellow #FFC629**.

## Pages
- `/` — home, seven services, brand showcase, contact and six clear action tiles
- `/about.html` — detailed company overview, service coverage, working values, process and nationwide availability
- `/request.html?type=consultation` — consultation form → WhatsApp
- `/request.html?type=enquiries` — general enquiries form → WhatsApp
- `/request.html?type=partnership` — partnership form → WhatsApp
- `/request.html?type=quotation` — quotation form → WhatsApp
- `/request.html?type=zoom` — Zoom meeting request → WhatsApp (does not automatically schedule a Zoom call)
- `/complaints.html` — complaints form including image uploads to email; optional WhatsApp follow-up

All WhatsApp flows address `+2348034578343` (08034578343). Email: `jameswayly@gmail.com`.

## How complaint photo uploads work
The complaints form sends submissions and image attachments to `jameswayly@gmail.com` using [FormSubmit.co](https://formsubmit.co/documentation) via `multipart/form-data`. This is a THIRD-PARTY service, not a first-party private database. **Up to 3 JPG/PNG/WebP photos, 10 MB total.** The customer browser checks these limits; the provider may enforce additional constraints. The initial live submission generates a **one-time activation email** to the owner; they must activate this email before delivery works reliably. Test after deploying and verify an actual received email and images; do not consider uploads live until verified. The form includes a required consent checkbox, honeypot, and FormSubmit captcha. The website does **not** save uploads in Vercel storage. Never ask clients to upload highly sensitive personal documents.

## Vercel launch
1. Extract the ZIP, and push the files inside the directory (including `public/` and `vercel.json`) to a GitHub repository.
2. In https://vercel.com/new import the repository. Set framework to `Other` and output directory `public`; no build command is necessary. Deploy.
3. Submit a **test complaint with a harmless image**, click the activation link sent to `jameswayly@gmail.com`, then submit another test and check inbox + spam to verify attachments.
4. Verify all WhatsApp links go to the right account. Confirm the owner uses WhatsApp on this phone number.
5. Verify all five request modes, project enquiry form, mobile navigation, and the nationwide wording.

## Important information / editorial safeguards
- Business presence is described as nationwide based on the client's instruction; no street address or completed projects have been invented.
- The photo mockups are **brand concepts**, not real completed projects.
- Meeting dates are requests for follow-up, **not confirmed bookings or actual Zoom meeting URLs**.
- WhatsApp prefills a draft; the visitor must manually press Send in WhatsApp.
- If the organisation needs a private case tracker, attachment dashboard, automatic ticket IDs or acknowledgements, these require a backend and a protected storage service. These are not part of this static version.

## Local preview
`python -m http.server 8000 --directory public` and open http://localhost:8000.


## Investment / investor interest (new)
- `/investment.html` contains a dedicated **non-binding investment expression-of-interest** form.
- The form opens a WhatsApp DM to `+2348034578343` with the visitor's typed details. It does not collect funds, promise returns, or store investor submissions on Vercel.
- Below the form, **Request an Investment Zoom Meeting** opens `/request.html?type=zoom&topic=investment`, where visitors specify a proposed date, time (WAT), and purpose before sending a WhatsApp DM. This does **not** create a Zoom meeting automatically.
- Investment opportunities described are prospective discussion topics, not a representation of current, approved investment offers. Review applicable regulatory requirements before publishing any actual securities offering or accepting funds.


## 2026-11-19 Visual media update
- Original supplied approved JAFECO logo included in `public/jafeco-logo.png`.
- New concept illustrations bundled in `public/*.webp` and linked from all principal pages.
- 20-second **digitally animated aerial-style concept** included at `public/construction-drone-concept.mp4` and on homepage. Not actual aerial/drone footage of a real JAFECO project.
- Existing investment, complaint, quotation, consultation and WhatsApp request pages retained.
- Vercel preset Other; root `./`; output directory `public` (defined in `vercel.json`).
- Upload the entire extracted website repository content to GitHub, keeping the `public` folder and `vercel.json` in the root. Do not upload ZIP as a single file.
