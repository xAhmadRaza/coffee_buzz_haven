import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

class EmblaCarouselController {
  emblaApi;
  emblaNode;
  viewportNode;
  emblaButtonNextNode;
  emblaButtonPrevNode;

  constructor(
    emblaNode,
    viewportNode,
    emblaNavButtons = {},
    carouselOptions,
    options = {}
  ) {
    if (!emblaNode || !viewportNode) {
      throw new Error("emblaNode and viewportNode are required");
    }
    this.emblaNode = emblaNode;
    this.viewportNode = viewportNode;

    if (emblaNavButtons !== "_" && emblaNavButtons) {
      this.emblaButtonNextNode = emblaNavButtons.nextBtnNode;
      this.emblaButtonPrevNode = emblaNavButtons.prevBtnNode;
    }

    this.init(carouselOptions, options);
  }

  async init(carouselOptions, options) {
    this.emblaApi = EmblaCarousel(this.viewportNode, carouselOptions, [
      Autoplay(options ? options : {}),
    ]);

    if (this.emblaButtonNextNode && this.emblaButtonPrevNode) {
      this.removePrevNextBtnsClickHandlers =
        this.addPrevNextBtnsClickHandlers();
      this.emblaApi.on("destroy", this.removePrevNextBtnsClickHandlers);
    }
  }

  onNavButtonClick() {
    const autoplay = this.emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }

  addPrevNextBtnsClickHandlers() {
    const scrollPrev = () => {
      this.emblaApi.scrollPrev();
      this.onNavButtonClick();
    };

    const scrollNext = () => {
      this.emblaApi.scrollNext();
      this.onNavButtonClick();
    };

    this.emblaButtonPrevNode.addEventListener("click", scrollPrev, false);
    this.emblaButtonNextNode.addEventListener("click", scrollNext, false);

    const togglePrevNextBtnsState = () => {
      if (this.emblaApi.canScrollPrev()) {
        this.emblaButtonPrevNode.removeAttribute("disabled");
      } else {
        this.emblaButtonPrevNode.setAttribute("disabled", "disabled");
      }

      if (this.emblaApi.canScrollNext()) {
        this.emblaButtonNextNode.removeAttribute("disabled");
      } else {
        this.emblaButtonNextNode.setAttribute("disabled", "disabled");
      }
    };

    this.emblaApi
      .on("select", togglePrevNextBtnsState)
      .on("init", togglePrevNextBtnsState)
      .on("reInit", togglePrevNextBtnsState);

    togglePrevNextBtnsState();

    return () => {
      this.emblaButtonPrevNode.removeEventListener("click", scrollPrev, false);
      this.emblaButtonNextNode.removeEventListener("click", scrollNext, false);

      this.emblaApi
        .off("select", togglePrevNextBtnsState)
        .off("init", togglePrevNextBtnsState)
        .off("reInit", togglePrevNextBtnsState);

      this.emblaButtonPrevNode.removeAttribute("disabled");
      this.emblaButtonNextNode.removeAttribute("disabled");
    };
  }
}

export default EmblaCarouselController;
