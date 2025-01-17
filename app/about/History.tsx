import Image from "next/image";

export default function History()  {
    return (
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Rich History of Okeogboran: A Story of Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg font-bold mb-4 text-foreground">
                Historical Background of Okeogboran
              </p>
              <Image 
                src="/landscape.jpg"
                alt="Historical site" 
                width={600} 
                height={400}
                className="mb-4 mx-auto rounded-md"
              />
              <p className="mb-4 text-justify text-foreground">
                Okeogboran is a quarter in Supare Akoko, the quarter is bounded in the North by Oriri and Idofin, in the west by Obagure/ Egure, in the south by Ilisa and in the east by Ebiarewa.  
              </p>
              <p className="mb-4 text-justify text-foreground">
                Supare as a community is an amalgamation of people that migrated from different locations to settle in the present location. Some migrated from Ile ife, some from Benin, Owo, some from neighbouring towns while Okeogboran Indigenes migrated from Ikole Ekiti. Supare is bounded in the North by Ikare Akoko, in the North West by Irun Akoko, in the west by Imesi Ekiti, in the south by Ose river/ Emure Ekiti, in the south east by Oba Akoko and in the east by Akungba akoko. Supare is one of the towns in Akoko South West local government area of Ondo state, the town is made-up of 13 quarters. In addition to the main town there are 265 camps and farmsteads spreading and covering forest/ savanna land aiding the cultivation of both food and cash crops. 
              </p>
              <div className="bg-accent text-accent-foreground p-4 mb-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Supare Quarters</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Okeogboran</li>
                  <li>Oke Afaa</li>
                  <li>Ilisa</li>
                  <li>Ebiarewa</li>
                  <li>Etioro</li>
                  <li>Oriri</li>
                  <li>Idofin</li>
                  <li>Isenwa</li>
                  <li>Egure</li>
                  <li>Obagure</li>
                  <li>Ibereku</li>
                  <li>Okeere</li>
                  <li>Ugbe</li>
                </ul>
              </div>
              <p className="mb-4 text-justify text-foreground">
                It was narrated through oral tradition that we migrated from Ikole Ekiti about 400 years ago, after our forefathers left Ile Ife the Original settlement of all Yoruba race, after sojourning for years at Ikole Ekiti, Two Prominent persons ODERU and ANOHUN in company of their Wives, Children, relations and Followers left Ikole to sojourn in a new place that will be determined by Ifa oracle, they stopped briefly in Irun Akoko during this short period some of the men married from Irun, for this reason many OKEOGBORAN Indigenes have relations in Irun Akoko till today, they later moved to a location in Supare called Ugbo-Oro a valley in Okeede to settle down. The preference for Ugbo oro was mainly because of the numerous wars going on at the material time, the valley served as a hiding place. They were there for many years where they erected buildings and engaged in farming activities before they migrated to the current location in Supare called Oke-Ogbonran Quarters. It was mentioned that a British white man that sited them where they were setling in the valley and persuaded them to come to the present location. 
              </p>
              <p className="mb-4 text-justify text-foreground">
                Today, Okeogboran stands as a testament to progress, bounded by Oriri and Idofin in the North, 
                Obagure/Egure in the West, Ilisa in the South, and Ebiarewa in the East. The quarter&apos;s 
                landscape features both plains and notable waterways, including the streams of Omura, 
                Omodoko, and Olujoru.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Cultural Heritage</h3>
              <ul>
                <li className="mb-4 text-justify">
                  <h1 className="font-bold mb-2 text-foreground">a. THE OLUNHUNDOLE</h1>
                  <p className="text-foreground">
                    Is great annual festival that must be Celebrated to appease gods and fore fathers before eating new yam, it is done between 6th and 7th month of the year. OLUNHUNDOLE is well accepted not by only Oke Ogbonran people but the entire supare community and neighbouring towns and villages. When asked the need for the OLUNHUNDOLE annually and not anytime we like or abandoned it totally. We were told that, Oke Ogbonran cannot and should not joke with OLUNHUNDOLE as it brings protection, bountiful harvest to the people of Oke Ogbonran. Pa. Samson Ariyo said that his father told him that the only year when our forefathers failed to celebrate the festival the consequences were disastrous as so many people lost their lives and there were numerous bad occurrences.
                  </p>
                  <Image 
                    src="/oke.png"
                    alt="Cultural celebration" 
                    width={600} 
                    height={200}
                    className="mb-4 mx-auto mt-4 rounded-md"
                  />
                  <p className="text-foreground">
                    Ugbo oro was the first site for the OLUNHUNDOLE, the shrine was shifted to Ugbo Omura because of the long distance to the town, hilly and rocky terrain to the town and the complaints from Okeere farmers that their farms and crops were often destroyed by the large crowd following the Olunhundole resulting in poor yield of crops. There was relocation of the site/shrine to (Ugbo Omura) a portion of land reserved as starting point. This episode was the reason why Olunhundole don&apos;t pass through Okeere till today. The Olunhundole doesn&apos;t follow same path twice, there are fixed routes followed by the Olunhundole from the shrine to ITA OKE OGBORAN for save keeping till today. 
                  </p>
                </li>
                <li className="mb-4">
                  <h1 className="font-bold text-foreground">b. Bata</h1>
                  <p className="text-foreground">
                    Bata is a special music with special songs and peculiar dance that Oke Ogbonran people cherished. It is normally in place during Marriage ceremonies and Burial of our Aged people. Bata dance is virtually in the blood of every Oke Ogbonran sons and daughters. I know you will want to confirm.
                  </p>
                </li>
                <li className="mb-4">
                  <h1 className="font-bold text-foreground">c. Oro Eegun</h1>
                  <ol>
                    <li>i. Abodogen</li>
                    <li>ii. Alagada</li>
                    <li>iii. Afelelemuko</li>
                    <li>iv. Urarewo</li>
                    <li>v. Esuse</li>
                    <li>vi. Ele</li>
                    <li>vii. Alaiye fefe</li>
                    <li>viii. Ukoko</li>
                    <li>ix. Agbenteeeri</li>  
                    <li>x. Omolugbogboro</li>
                    <li>xi. Omogbenlenge</li>
                  </ol>
                </li>
                <li><h1 className="font-bold text-foreground">d. Ogbele</h1>for young female up to 20 years of age.</li>
                <li><h1 className="font-bold text-foreground">e. Odun Omi</h1> for young female to marriage age - Usually to know who are still Virgins.</li>
                <li><h1 className="font-bold text-foreground">f. Odun Ogun</h1></li>
              </ul>
            </div>
          </div>
        </div>
    )
}

