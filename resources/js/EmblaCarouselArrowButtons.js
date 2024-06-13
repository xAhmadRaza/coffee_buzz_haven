const addTogglePrevNextBtnsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextBtnsState = () => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute("disabled");
    else prevBtn.setAttribute("disabled", "disabled");

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute("disabled");
    else nextBtn.setAttribute("disabled", "disabled");
  };

  emblaApi
    .on("select", togglePrevNextBtnsState)
    .on("init", togglePrevNextBtnsState)
    .on("reInit", togglePrevNextBtnsState);

  return () => {
    prevBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("disabled");
  };
};

export const addPrevNextBtnsClickHandlers = (
  emblaApi,
  prevBtn,
  nextBtn,
  onButtonClick
) => {
  const scrollPrev = () => {
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  };
  const scrollNext = () => {
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  };
  prevBtn.addEventListener("click", scrollPrev, false);
  nextBtn.addEventListener("click", scrollNext, false);

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(
    emblaApi,
    prevBtn,
    nextBtn
  );

  return () => {
    removeTogglePrevNextBtnsActive();
    prevBtn.removeEventListener("click", scrollPrev, false);
    nextBtn.removeEventListener("click", scrollNext, false);
  };
};
class EmblaCarouselController {
  emblaApi;
  emblaNode;
  viewportNode;
  emblaButtonNextNode;
  emblaButtonPrevNode;

  constructor(emblaNode, viewportNode, emblaNavButtons = {}, options = {}) {
    if (!emblaNode || !viewportNode) {
      throw new Error("emblaNode and viewportNode are required");
    }

    this.emblaNode = emblaNode;
    this.viewportNode = viewportNode;

    if (emblaNavButtons !== "_") {
      this.emblaButtonNextNode = emblaNavButtons.nextBtnNode;
      this.emblaButtonPrevNode = emblaNavButtons.prevBtnNode;
    }

    this.init(options);
  }

  init(options) {
    this.emblaApi = EmblaCarousel(this.viewportNode, options, [
      Autoplay(options),
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
