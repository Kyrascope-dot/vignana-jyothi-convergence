import DomeGallery from '../components/DomeGallery';
export default function Clubs() {
  // 40 club logos
  const clubImages = [
    { src: '/clubs/acm.png', alt: 'ACM' },
    { src: '/clubs/airbots.png', alt: 'Airbots' },
    { src: '/clubs/asma.png', alt: 'Asma' },
    { src: '/clubs/aws.png', alt: 'AWS' },
    { src: '/clubs/candleves.png', alt: 'Candleves' },
    { src: '/clubs/cea.png', alt: 'CEA' },
    { src: '/clubs/creativearts.png', alt: 'Creative Arts' },
    { src: '/clubs/csi.png', alt: 'CSI' },
    { src: '/clubs/dq.png', alt: 'DQ' },
    { src: '/clubs/garuda.png', alt: 'Garuda' },
    { src: '/clubs/ici.png', alt: 'ICI' },
    { src: '/clubs/ieee.png', alt: 'IEEE' },
    { src: '/clubs/gdgc.png', alt: 'GDGC' },
    { src: '/clubs/iete.png', alt: 'IETE' },
    { src: '/clubs/igbc.png', alt: 'IGBC' },
    { src: '/clubs/internetsoc.png', alt: 'Internet Society' },
    { src: '/clubs/ioe.png', alt: 'IOE' },
    { src: '/clubs/isi.png', alt: 'ISI' },
    { src: '/clubs/isie.png', alt: 'ISIE' },
    { src: '/clubs/iste.png', alt: 'ISTE' },
    { src: '/clubs/iucee.png', alt: 'IUCEE' },
    { src: '/clubs/kaksya.png', alt: 'Kaksya' },
    { src: '/clubs/krithomedh.png', alt: 'Krithomedh' },
    { src: '/clubs/mathletes.png', alt: 'Mathletes' },
    { src: '/clubs/mih.png', alt: 'MIH' },
    { src: '/clubs/nss.png', alt: 'NSS' },
    { src: '/clubs/sae.png', alt: 'SAE' },
    { src: '/clubs/sahthivanam.png', alt: 'Sahthivanam' },
    { src: '/clubs/scintillate.png', alt: 'Scintillate' },
    { src: '/clubs/sforce.png', alt: 'Sforce' },
    { src: '/clubs/smc.png', alt: 'SMC' },
    { src: '/clubs/stent.png', alt: 'Stent' },
    { src: '/clubs/th.png', alt: 'TH' },
    { src: '/clubs/toastmasters.png', alt: 'Toastmasters' },
    { src: '/clubs/vjarc.png', alt: 'VJARC' },
    { src: '/clubs/vjstartups.png', alt: 'VJ Startups' },
    { src: '/clubs/vjteatro.png', alt: 'Teatro' },
    { src: '/clubs/vjvibes.png', alt: 'VJ Vibes' },
    { src: '/clubs/voice.png', alt: 'Voice' },
    { src: '/clubs/xplor.png', alt: 'Xplor' },
  ];

  return (

      <section className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            Organised by
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Convergence 2K26R is brought to you by 46 student clubs and technical societies working together to create an unforgettable experience
          </p>
        </div>


        <div className="relative w-full" style={{ height: '400px' }}>
          <DomeGallery
            images={clubImages}
            fit={0.6}
            fitBasis="auto"
            minRadius={500}
            maxRadius={800}
            overlayBlurColor="#000000"
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
            openedImageWidth="500px"
            openedImageHeight="500px"
            grayscale={false}
            dragSensitivity={18}
            maxVerticalRotationDeg={8}
            segments={35}
            dragDampening={2}
            hideOverlays={true}
          />
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-cyan-400 text-xs sm:text-sm">
            Drag to explore & Click to enlarge
          </p>
        </div>
      </section>
    
  );
}
