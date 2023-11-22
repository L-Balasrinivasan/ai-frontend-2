import React from "react";
import { Accordion } from "react-bootstrap";
import "./howitworks.css";
function HowItWorks({ selectedParagraph }) {
  return (
    <div className="head_container">
      <Accordion className="htw_accordian">
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div>
              <p className="accordian_head m-0">How it Works</p>
              <p className="htw_accordian_sub m-0">A User-Friendly Guide</p>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "85%",
                gap:"20px",
              }}
            >
              <div style={{ flex: 4 }}>
                <div className="number_div">1</div>
                <p className="body_heading mt-2" style={{}}>
                  Upload Images
                </p>
                <p className="body_content">
                  Begin by uploading two images of your chore
                </p>
              </div>
              <div style={{ flex: 4 }}>
                <div className="number_div">2</div>
                <p className="body_heading mt-2" style={{}}>
                  Adjust Similarity Threshold
                </p>
                <p className="body_content">
                  Use the slider to set your desired similarity threshold
                </p>
              </div>
              <div style={{ flex: 4}}>
                <div className="number_div">3</div>
                <p className="body_heading mt-2" style={{}}>
                  View Results
                </p>
                <p className="body_content">
                  Instantly see the seniority score and a description of whether
                  the images are similar or not
                </p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion
        className="htw_accordian "
        style={{ paddingtop: "0px !important" }}
      >
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div>
              <p className="accordian_head m-0">Tech Concepts</p>
              <p className="htw_accordian_sub m-0">Lorem Ipsum</p>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "90%",
              }}
            >
              {selectedParagraph === "EMSIM" && (
                <>
                  <p className="body_heading">
                    Enterprise Minds Similar Image (EMSIM) :
                  </p>
                  <p className="htw_accordian_sub">
                    EMSIM is an adaptation of OpenAI's CLIP model for the use
                    case of assessing image similarity. This cutting-edge neural
                    network transforms visuals into feature vectors (numbers).
                    By measuring cosine similarity between vectors, it measures
                    image likeness, along multiple dimensions such as appearance
                    and context. This flexible method permits wide-ranging
                    domain identification, spanning intricate designs to vast
                    landscapes. From a business perspective, the implications
                    are vast. Use cases include enhancing e- commerce
                    experiences by offering visually similar product
                    recommendations, aiding copyright checks by spotting image
                    replications, optimizing video compression by recognizing
                    repetitive frames, and powering image search engines. The
                    visual results underscore CLIP's precision in pinpointing
                    near-identical images, offering businesses a competitive
                    advantage in content curation, user engagement, and
                    efficient media storage.
                  </p>
                </>
              )}
              {selectedParagraph === "EMGeo" && (
                <>
                  <p className="body_heading">
                    Enterprise Minds Geo Tagger (EMGeo):
                  </p>
                  <p className="htw_accordian_sub">
                    EMGeo is a sophisticated tool engineered to pinpoint and
                    identify locations within textual content. Utilizing
                    advanced techniques such as Named Entity Recognition and
                    Context-Aware Parsing, it meticulously scans through
                    sentences to extract geographical entities, be it cities,
                    countries, or landmarks. Technical elements such as
                    tokenization and dependency parsing further refine the
                    extraction process, ensuring utmost precision. From a
                    business standpoint, the utility of EMGeo is vast. It can
                    revolutionize content analysis by providing geo-contextual
                    insights, enhance user experience in travel platforms by
                    delivering location-specific recommendations, and assist in
                    data analytics by adding a spatial dimension to textual
                    data. In essence, EMGeo bridges the gap between text and
                    geography, paving the way for enriched data interpretation
                    and user interactions
                  </p>
                </>
              )}
              {selectedParagraph === "EMAAS" && (
                <>
                  <p className="body_heading">
                    Enterprise Minds Article Analyzer and Summarizer (EMAAS):
                  </p>
                  <p className="htw_accordian_sub">
                    EMAAS harnesses LLMs to rapidly summarize text information
                    and facilitate Q&A on large documents. This system employs a
                    LLM, trained on a vast dataset, to comprehend and categorize
                    document content. It’s an efficient approach that saves time
                    and resources, as there’s no need to train a complex AI
                    model from scratch. The system is scalable, capable of
                    handling large documents and high volumes of queries. It
                    ensures accurate and contextually relevant answers, thanks
                    to the use of a concurrent language model.
                  </p>
                  <p className="htw_accordian_sub">
                    The applications are diverse, spanning customer support,
                    R&D, legal compliance, and education. This approach is an
                    effective solution for businesses aiming to automate their
                    Q&A services on large documents or texts
                  </p>
                </>
              )}

              {selectedParagraph === "EMALI" && (
                <>
                  <p className="body_heading">
                    Enterprise Minds Auto Location Identifier (EMALI):
                  </p>
                  <p className="htw_accordian_sub">
                    EMALI is like a global tour guide living inside your
                    computer (or your hand, if using on a smartphone). This
                    AI-powered wiz uses a pre-existing model, trained on a vast
                    array of data, to identify and categorize locations in
                    images. It’s like having a seasoned traveler at your
                    fingertips but without the need to train it from scratch.
                    This system is as adaptable as it is smart and capable of
                    dealing with a multitude of images and location categories.
                    It’s like having a personal cartographer who ensures precise
                    location recognition using advanced techniques like nearest
                    neighbor search. The potential applications are as diverse
                    as the locations it can recognize. From e- commerce
                    platforms offering location-based product recommendations,
                    to social media platforms enhancing user experience with
                    location tagging. EMALI is an efficient and effective
                    solution for businesses aiming to navigate the world of
                    location recognition AI.
                  </p>
                </>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default HowItWorks;
