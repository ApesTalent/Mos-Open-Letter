/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import styles from '../../../index.module.scss'
import { useRef, useEffect } from 'react'

const Sign = () => {
  const firstRef = useRef(null)
  const secondRef = useRef(null)

  const showSecondTab = () => {
    firstRef.current.style.display = 'none'
    secondRef.current.style.display = 'block'
  }

  const showFirstTab = () => {
    firstRef.current.style.display = 'block'
    secondRef.current.style.display = 'none'
  }

  useEffect(() => {
    showFirstTab()
  }, [])

  return (
    <div className={`${styles.content} max-w-7xl mx-auto`}>
      <div className={styles.tProposalSection}>
        <div className={styles.tProposalSection__content} ref={firstRef}>
          <div className={styles.tProposalSection__subtitle}>
            Winning Proposals
          </div>
          <div className={styles.tProposalSection__tabs}>
            <div
              className={styles.tProposalSection__tabs__active}
              onClick={() => showFirstTab()}
            >
              {' '}
              2 Breathing NFTs
            </div>
            <div
              className={styles.tProposalSection__tabs__normal}
              onClick={() => showSecondTab()}
            >
              {' '}
              OASIS
            </div>
          </div>
          <div className={styles.tProposalSection__title}>
            Funded Grant:{' '}
            <span className={styles.tProposalSection__title__bold}>
              Jan Sladecko: 2 Breathing NFTs
            </span>
          </div>

          <div className={styles.tProposalSection__textTitle}>
            Hi, my name is Jan,
          </div>

          <div className={styles.tProposalSection__text}>
            In the last few years, I’m searching for a marriage of mental health
            and motion design. I’ve created a couple of guided breathing pieces,
            interactive art that mirrors you with connect and leads to
            stillness, helped start breathing APP, and keep exploring this
            sector. I was really happy to meet the crew from Moment of Space in
            London and immediately felt drawn to them and that we are on the
            same page.
          </div>
          <div className={styles.tProposalSection__text}>
            Currently, I’m working on two NFT pieces that I would like to
            finish. One of them is a combination of techniques where I’m also
            using AI in a creative way as part of the process to create a
            breathing fractal for calming the breath. And second is a huge
            fairytale mushroom that will slowly breathe in nature and bring
            energy to its surrounding to show interconnectedness of us all. I’m
            gradually developing an aesthetic of a virtual world that I would
            like to bring people to interact and I feel it could go fantastic
            with MoS.
          </div>

          <div className={styles.tProposalSection__text}>
            Those animations are just a beginning of the bigger journey that I’d
            like to take and ideally collaborate with MoS on some of our
            immersive large scale projects that we are currently brainstorming
            and planning with like-minded people around me and gives me meaning
            to spend my full focus on.
          </div>

          <div className={styles.tProposalSection__text}>
            Thank you if you read it all the way here. And wish you a great day.
          </div>

          <div className={styles.tProposalSection__text}>Jan</div>

          <div className={styles.tProposalSection__textTitle}>
            Grant size: 3ETH
          </div>

          <div className={styles.tProposalSection__proposals}>
            <div className={styles.tProposalSection__proposals__title}>
              Links:
            </div>

            <div className={styles.tProposalSection__proposals__item}>
              <a
                href="https://www.instagram.com/p/COZo6WznHzI"
                target="_blank"
                rel="noreferrer"
              >
                Example of a breathing NFT link:
              </a>
              <h4>
                Stillness piece. Yours reflection is chaotic and turbulent and
                when you stop it mirrors you. More still you get sharper
                reflection of you will appears.
              </h4>
            </div>

            <div className={styles.tProposalSection__proposals__item}>
              <a
                href="https://www.dropbox.com/sh/rw766ky4wcsrfhw/AAAGFF6KuzgnY0t-hsxoCRUCa?dl=0&preview=arthouse_mirror_horizontal_92s_v7.mp4"
                target="_blank"
                rel="noreferrer"
              >
                Dropbox links to more artwork
              </a>
            </div>

            <div className={styles.tProposalSection__proposals__item}>
              <a
                href="https://www.instagram.com/jan.sladecko/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram profile link
              </a>
            </div>
          </div>
        </div>

        <div className={styles.tProposalSection__content} ref={secondRef}>
          <div className={styles.tProposalSection__subtitle}>
            Winning Proposals
          </div>
          <div className={styles.tProposalSection__tabs}>
            <div
              className={styles.tProposalSection__tabs__normal}
              onClick={() => showFirstTab()}
            >
              {' '}
              2 Breathing NFTs
            </div>
            <div
              className={styles.tProposalSection__tabs__active}
              onClick={() => showSecondTab()}
            >
              {' '}
              OASIS
            </div>
          </div>
          <div className={styles.tProposalSection__title}>
            Funded Grant:{' '}
            <span className={styles.tProposalSection__title__bold}>
              Oasis: Art Gallery Event
            </span>
          </div>

          <div className={styles.tProposalSection__textSubTitle}>
            Event Proposal from Em_Jays#0919 (Dreamer & Event Planner)
          </div>

          <div className={styles.tProposalSection__textTitle}>
            Event Overview:
          </div>

          <div className={styles.tProposalSection__text}>
            A collective gathering of community members that utilize the MoS
            App. During this event, patrons will have the opportunity to meet
            with other humans who share a deep love and understanding of the
            practice of meditation. This event will also provide an opportunity
            to showcase and display Josh Pierce’s Open Edition pieces in an open
            private art gallery setting. The main intention of this event is to
            collectively meditate together under one roof. The added presence of
            Josh’s work will add more depth and relationship with the art within
            the MoS ecosystem. For those interested to learn more about Web3, it
            will also be an opportunity to share insights and education to the
            public.
          </div>

          <div className={styles.tProposalSection__text}>
            Those participating in the event are volunteers from the collective
            who are passionate about sharing MoS with others. We would also
            extend the invitation to artists, meditation teachers, and builders
            that align with MoS and its intentions.
          </div>

          <div className={styles.tProposalSection__text}>
            It will achieve an IRL meet up for the Web3 family and Web2
            community to "unite meditation, tech and co-creation to build a
            brighter future together." We can set a max capacity dependent on
            the location we select as well as set a deadline for RSVPs once that
            location is secured and confirmed.
          </div>

          <div className={styles.tProposalSection__text}>
            This event can help increase the visibility of beautiful MoS art
            NFTs to app users and help strengthen aligning partnerships,
            organizations in the community, and help MoS become a leader in
            meditation.
          </div>

          <div className={styles.tProposalSection__text}>
            Promotional support and organization are provided by team members
            and community members with the skills and experience to do so. Those
            who contribute may be incentivized by an NFT giveaway or meditative
            coaching.
          </div>

          <div className={styles.tProposalSection__text}>
            The exact cost to rent out a space to hold this event will depend on
            factors like location, size, and the length of the lease. Most
            spaces in large cities rent out for a few hundred dollars within a
            minimum of a set number of hours. Larger more popular spaces
            obviously will run into higher numbers for an extended period. I
            could imagine an event like this successfully running for only a few
            hours in one day in a fairly desirable location that works best for
            the team and with MoS community leaders looking to help host the
            event. This event can be executed in a personal setting as big as a
            regular yoga studio in terms of size.
          </div>

          <div className={styles.tProposalSection__text}>-</div>

          <div className={styles.tProposalSection__textTitle}>
            Grant Size: 0.5ETH - 1ETH
          </div>
          <div className={styles.tProposalSection__text}>
            I will do my best to find the best value for the total grant value
            decided.
          </div>
          <div className={styles.tProposalSection__text}>
            The timeline would be about 3 months to secure a location and space,
            to promote and send out invitations, organise interested meditation
            teachers, and to gather RSVPs to the event.
          </div>

          <div className={styles.tProposalSection__text}>
            Goal: To connect and meditate together under one roof within our MoS
            community and to educate and share the beautiful art within the
            ecosystem and collective.
          </div>

          <div className={styles.tProposalSection__text}>-</div>

          <div className={styles.tProposalSection__textTitle}>
            Alternate ways to meditate IRL "together" (maybe just not all under
            the same roof)
          </div>
          <div className={styles.tProposalSection__text}>
            Coordinated synchronized global event (or perhaps regular monthly
            events) wherever two or more MoS community members are able to
            gather IRL, ye shall share a Moment of Space. Collectively, we share
            a Moment of Space together with a live meditation via Around or Zoom
            so everyone can see and hear whoever is leading the meditation.
            After the meditation we allow all the individual gatherings to chat
            and share experiences from across the world. **Yes, we should
            definitely do these monthly :)
          </div>
          <div className={styles.tProposalSection__text}>
            This will encourage new friendships and relationships to be
            developed close to home while getting to know people a bit more
            globally too... and it is 100% inclusive of the entire MoS
            community!
          </div>

          <div className={styles.tProposalSection__text}>
            1. MoS could establish a global network of local volunteer "MoS
            Ambassadors" - Ambassadors would establish safe, public spaces for
            MoS meetups (local libraries, yoga studios, wellness centers, etc.)
          </div>

          <div className={styles.tProposalSection__text}>
            2. Ambassadors would post their local Meetup locations to a database
            that MoS publishes via Web2 (MoS website/Discord... this should be
            relatively inexpensive to do.)
          </div>

          <div className={styles.tProposalSection__text}>
            3. Each member of MoS community would be encouraged to bring a
            friend to each Global MoS event. **If a MoS community member finds
            themselves with no other MoS community nearby, inviting a friend
            will achieve a gathering of two or more.
          </div>

          <div className={styles.tProposalSection__text}>-</div>

          <div className={styles.tProposalSection__textTitle}>
            Bonus Extension to this idea...
          </div>
          <div className={styles.tProposalSection__text}>
            Develop a program for Local Ambassadors to apply to represent MoS at
            regional NFT/Web3 events all over the world. If accepted, MoS would
            arrange for admission or pay for Ambassador's admission to the event
            and provide guidelines and promotional materials as appropriate for
            each type of event. Maybe even coordinate a MoS meditation for the
            event led by MoS staff via Zoom or Around. Then the local MoS
            Ambassador could share marketing materials and field basic questions
            about MoS and her or his experience.
          </div>
          <div className={styles.tProposalSection__text}>
            The core proposed timeline and budget is aligned with these two
            additional proposal options. These additions could stand alone as
            proposals or be considered together. Thank you so much for your time
            and consideration.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sign
