function Options_ui(BaseName) {
  var mconsole = new __mconsole(BaseName + ".Options_ui");

  $("#divInfraAreaTelaD").append("<div id='seipp-div-options-ui'/>");

  $("#seipp-div-options-ui").load(
    browser.extension.getURL("cs_modules/options_ui/options_ui.html"), function () {
      $("#divInfraBarraComandosSuperior input").hide();
      OptionsLoad();
    }
  );

  /******************************************************************************
   * Atualiza o formulário com as configurações salvas.                         *
   ******************************************************************************/
  function OptionsLoad() {
    $("#theme").val(SavedOptions.theme);

    $("input[type='checkbox']").each(function () {
      if (SavedOptions.CheckTypes.indexOf($(this).attr("data-type")) != -1) {
        $(this).attr("checked", true);
        mconsole.log("checked");
      } else {
        $(this).attr("checked", false);
        mconsole.log("unchecked");
      }
    })
    $("#cliquemenos").on("change", mostraDivConfig);

    $("input[name='formato'][value="+SavedOptions.formato+"]").attr("checked", true);
    $("input[name='formato']").on("change", MostraNivelAcesso);
    MostraNivelAcesso();

    mconsole.log("RESTRITO: " + SavedOptions.nivelAcesso);
    $("input[name='nivelAcesso']").on("change", MostraRestrito);
    $("input[name='nivelAcesso'][value="+SavedOptions.nivelAcesso+"]").attr("checked", true);
    MostraRestrito();

    $("#hipoteseLegal").val(SavedOptions.hipoteseLegal);

    mostraDivConfig();
    $("#save-button").on("click", OptionsSave);
  }

  function MostraNivelAcesso() {
    if ($("input[name='formato']:checked").val() == "D"){
      $("#nivelacesso").hide("fast");
    } else {
      $("#nivelacesso").show("fast");
    }

  }

  function MostraRestrito() {
    if ($("#rdRestrito:checked").val() == "R") {
      $("#lhipoteseLegal").show("fast");
      $("#hipoteseLegal").show("fast");
    } else {
      $("#lhipoteseLegal").hide("fast");
      $("#hipoteseLegal").hide("fast");
    }
  }

  function mostraDivConfig() {
    if (document.getElementById("cliquemenos").checked) {
      $("#divFormato").show("fast");
    }
    else
      $("#divFormato").hide("fast");
  }

  function OptionsSave() {
    var CheckTypes = [];
    $("input[type='checkbox']:checked").each(function () {
      CheckTypes.push($(this).attr("data-type"));
    });

    var theme = $("#theme").val();
    var formato = $("input[name='formato']:checked").val();
    var nivelAcesso = $("input[name='nivelAcesso']:checked").val();
    var hipoteseLegal = $("#hipoteseLegal").val();
    mconsole.log(nivelAcesso);

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    var OptionsToSave = {theme, CheckTypes, formato, nivelAcesso, hipoteseLegal};
    if (isChrome) {
      browser.storage.local.set(OptionsToSave);
    } else {
      browser.storage.local.set(OptionsToSave).then(null, onError);
    }
    alert("Salvo");
    window.location.assign(window.location.href);
  }
}