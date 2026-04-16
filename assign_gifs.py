#!/usr/bin/env python3
"""Assign sarcastic/funny Giphy gifs to posts missing featured images."""
import os
import re

CONTENT_DIR = "/home/paulallen/dublinrush-next/content"

# Hand-picked gifs with editorial judgement for each article
# Format: slug -> (giphy_id, alt_text_reason)
GIF_ASSIGNMENTS = {
    # CEO gets paid 250k and people are upset about it being TOO LOW
    "an-post-ceo-pay-debate-a-window-into-semi-state-sector-challenges": (
        "YJjvTqoRFgZaM",  # Woody Harrelson wiping tears with money
        "When your CEO salary hasn't moved since 2019"
    ),
    # Airport boss decides to stay. How brave.
    "daa-leadership-stability-kenny-jacobs-stay-signals-more-than-just-continuity": (
        "ui1hJRqBMEqoHSzPCz",  # Cool guy walking away from explosion
        "Leadership stability in action"
    ),
    # Ryanair forcing digital boarding passes
    "digital-boarding-passes-more-than-just-a-boarding-gate-fad": (
        "3oKIPnAiaMCws8nOsE",  # Cat typing furiously on keyboard
        "Trying to find your boarding pass at the gate"
    ),
    # EU caving to Big Tech on AI regulation
    "eus-ai-and-gdpr-policy-shift-what-it-means-for-irelands-tech-landscape": (
        "QMHoU66sBXqqLqYvGO",  # This is fine dog in burning room
        "The EU regulating AI"
    ),
    # Government quietly making health insurance more expensive
    "government-hikes-health-insurance-levy-a-subtle-squeeze-on-irish-pockets": (
        "67ThRZlYBvibtMA9Em",  # Homer Simpson backing into hedge
        "Irish pockets after the levy increase"
    ),
    # The universal panic of sending the wrong email
    "how-to-recall-an-email-in-outlook": (
        "l1KVaj5UcbHwrBMqI",  # Michael Scott screaming NO
        "When you hit send on the wrong email"
    ),
    # Ireland considering nuclear energy for the first time
    "nuclear-energy-an-ireland-ready-to-reassess-its-energy-ambitions": (
        "3o7aCTNjq3qiUbzrHi",  # Nuclear explosion but make it casual
        "Ireland casually reconsidering nuclear"
    ),
    # Rents going up for the 18th quarter in a row
    "rent-hikes-unveil-irelands-persistent-housing-dilemma": (
        "3o6wrvdHFbwBrUFenu",  # Man looking at price tag in shock
        "Irish renters checking Daft.ie"
    ),
    # US exports surge - money money money
    "september-surge-in-us-exports-what-irelands-businesses-need-to-know": (
        "l0HFkA6omMkMg8Zb2",  # Money printer go brrrr
        "US exports in September"
    ),
    # Telling marketers to stop fighting Google AI
    "stop-fighting-googles-ai-takeover-of-adwords": (
        "VGG8UY1nEl66Y",  # Resistance is futile Borg
        "PPC managers resisting Google AI"
    ),
    # Small town post office being sold off
    "wexford-post-office-sale-signals-shifts-beyond-a-local-landmark": (
        "hStvd5LiWCFzYNyxR4",  # Sad wave goodbye
        "Wexford saying goodbye to the post office"
    ),
    # Dublin office prices dropping
    "what-the-price-drop-tells-us-about-dublins-office-market": (
        "YnkMcHgNIMW4Oe7UC9",  # Spongebob everything is fine burning
        "Dublin commercial real estate agents right now"
    ),
}

def update_frontmatter(filepath, giphy_id, alt_text):
    """Update the featured_image in MDX frontmatter with a Giphy URL."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    gif_url = f"https://media.giphy.com/media/{giphy_id}/giphy.gif"

    # Replace empty featured_image
    content = re.sub(
        r'featured_image: ""',
        f'featured_image: "{gif_url}"',
        content,
        count=1
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    return gif_url


if __name__ == "__main__":
    updated = 0
    for slug, (giphy_id, alt_text) in GIF_ASSIGNMENTS.items():
        filepath = os.path.join(CONTENT_DIR, f"{slug}.mdx")
        if not os.path.exists(filepath):
            print(f"  SKIP (not found): {slug}")
            continue

        url = update_frontmatter(filepath, giphy_id, alt_text)
        print(f"  ✓ {slug}")
        print(f"    {alt_text}")
        print(f"    {url}")
        updated += 1

    print(f"\nUpdated {updated} posts with Giphy gifs")
